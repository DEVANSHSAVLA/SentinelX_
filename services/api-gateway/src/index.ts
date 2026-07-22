import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { z } from 'zod';
import { logger } from './middleware/logger';
import { authenticate, authorize, AuthenticatedRequest } from './middleware/auth';
import { validateRequest } from './middleware/validate';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_2026';

// Zod Validation Schemas
const ScamAnalyseSchema = z.object({
  caller_number: z.string().min(5, 'Caller number required'),
  call_transcript: z.string().min(3, 'Call transcript text required'),
  origin_ip: z.string().optional(),
  sip_headers: z.record(z.string()).optional(),
});

const CurrencyScanSchema = z.object({
  image_base64: z.string().min(10, 'Base64 image required'),
  claimed_denomination: z.number().int().positive(),
  device_metadata: z.string().optional(),
});

const GraphAnalyseSchema = z.object({
  seed_node_id: z.string().min(1, 'Seed node ID required'),
});

const CitizenAssessSchema = z.object({
  message_text: z.string().min(2, 'Message text required'),
  language: z.string().default('en'),
});

const GeoEventSchema = z.object({
  incident_type: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  risk_score: z.number().min(0).max(1).default(0.0),
  description: z.string().optional(),
});

const EvidencePackageSchema = z.object({
  case_number: z.string().min(1),
  incident_type: z.string().min(1),
  reporter_name: z.string().min(1),
  call_transcript: z.string(),
  threat_level: z.string().default('CRITICAL'),
  scam_score: z.number().default(0.9),
  deepfake_score: z.number().default(0.0),
  money_trail: z.array(z.object({
    tx_id: z.string(),
    from_account: z.string(),
    to_account: z.string(),
    amount: z.number(),
    timestamp: z.string(),
  })).default([]),
});

// Axios Upstream Timeout & Retry Wrapper
const safePost = async (url: string, body: any, correlationId: string) => {
  return await axios.post(url, body, {
    headers: { 'x-correlation-id': correlationId },
    timeout: 5000, // 5s timeout budget
  });
};

// Middleware configs
app.use(cors({ origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*' }));
app.use(express.json());

// Correlation ID & W3C TraceContext Middleware
app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || `corr-${uuidv4()}`;
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// Logger logging HTTP requests
app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  logger.info(`HTTP ${req.method} ${req.url}`, { correlationId: req.correlationId });
  next();
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
// Root Route Handler
app.get('/', (req, res) => {
  return res.json({
    status: 'UP',
    service: 'SentinelX Enterprise API Gateway',
    version: 'v2.0.0',
    port: PORT,
    endpoints: {
      health: '/health',
      liveness: '/health/liveness',
      readiness: '/health/readiness',
      auth: '/api/v1/auth',
    }
  });
});

app.use(limiter);

// ----------------------------------------------------
// AUTH ENDPOINTS
// ----------------------------------------------------

app.post('/api/v1/auth/register', async (req: AuthenticatedRequest, res: Response) => {
  const { email, password, name, role, phone } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role && Object.values(UserRole).includes(role) ? role : UserRole.CITIZEN;

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        role: userRole,
        phone,
      },
    });

    logger.info(`User registered: ${user.email} (${user.role})`, { correlationId: req.correlationId });
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    logger.error(`Registration error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
});

app.post('/api/v1/auth/login', async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    logger.info(`User logged in successfully: ${user.email}`, { correlationId: req.correlationId });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    logger.error(`Login error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(500).json({ error: 'Internal server error during login' });
  }
});

// ----------------------------------------------------
// HOOKS WITH SERVICES (WITH ZOD VALIDATION)
// ----------------------------------------------------

// Scam service analyzing call metadata/transcripts
app.post('/api/v1/scam/analyse', authenticate, validateRequest(ScamAnalyseSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.SCAM_SERVICE_URL || 'http://localhost:8001'}/sessions/analyse`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway scam analysis dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Scam service unreachable' });
  }
});

// Counterfeit scan note validation
app.post('/api/v1/currency/scan', authenticate, validateRequest(CurrencyScanSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.COUNTERFEIT_SERVICE_URL || 'http://localhost:8006'}/currency/detect`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway counterfeit check dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Counterfeit service unreachable' });
  }
});

// Fraud graph transaction analysis
app.post('/api/v1/graph/analyse', authenticate, authorize([UserRole.OFFICER, UserRole.ANALYST, UserRole.ADMIN]), validateRequest(GraphAnalyseSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.FRAUD_GRAPH_URL || 'http://localhost:8002'}/graph/analyse`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway fraud graph dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Fraud graph service unreachable' });
  }
});

// Citizen Shield assessment
app.post('/api/v1/citizen/assess', authenticate, validateRequest(CitizenAssessSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.CITIZEN_SHIELD_URL || 'http://localhost:8003'}/citizen/assess`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway citizen assessment dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Citizen Shield service unreachable' });
  }
});

// Geospatial Intelligence Endpoints
app.get('/api/v1/geo/hotspots', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.THREAT_FUSION_URL || 'http://localhost:8004'}/geo/hotspots`;
    const response = await axios.get(url, {
      headers: { 'x-correlation-id': req.correlationId },
    });
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway geo hotspots dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Threat Fusion service unreachable' });
  }
});

app.post('/api/v1/geo/events', authenticate, validateRequest(GeoEventSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.THREAT_FUSION_URL || 'http://localhost:8004'}/geo/events`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway geo event dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Threat Fusion service unreachable' });
  }
});

// Evidence Endpoint
app.post('/api/v1/evidence/package', authenticate, authorize([UserRole.OFFICER, UserRole.ANALYST, UserRole.ADMIN]), validateRequest(EvidencePackageSchema), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const url = `${process.env.EVIDENCE_SERVICE_URL || 'http://localhost:8005'}/evidence/package`;
    const response = await safePost(url, req.body, req.correlationId!);
    return res.status(response.status).json(response.data);
  } catch (err) {
    logger.error(`Gateway evidence package dispatch error: ${(err as Error).message}`, { correlationId: req.correlationId });
    return res.status(502).json({ error: 'Bad Gateway: Evidence service unreachable' });
  }
});

// Core Database Fetches
app.get('/api/v1/cases', authenticate, authorize([UserRole.OFFICER, UserRole.ANALYST, UserRole.ADMIN]), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const cases = await prisma.case.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { citizenReports: true },
    });
    return res.json(cases);
  } catch (err) {
    return res.status(500).json({ error: 'Database fetch failed' });
  }
});

// Liveness & Readiness Health Probes
app.get('/health/liveness', (req, res) => {
  return res.json({ status: 'UP', service: 'sentinelx-api-gateway', probe: 'liveness' });
});

app.get('/health/readiness', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ status: 'UP', service: 'sentinelx-api-gateway', probe: 'readiness', database: 'CONNECTED' });
  } catch (err) {
    return res.status(503).json({ status: 'DOWN', service: 'sentinelx-api-gateway', probe: 'readiness', database: 'DISCONNECTED' });
  }
});

app.get('/health', (req, res) => {
  return res.json({ status: 'UP', service: 'sentinelx-api-gateway' });
});

// --------------------------------------------------------
// CROSS-ORIGIN STATE SYNC (In-Memory Shared State Store)
// Enables real-time sync of hash unlock, evidence files,
// cases, and user profile across Web, Desktop, and Mobile
// apps running on different localhost ports.
// --------------------------------------------------------

const sharedState: Record<string, any> = {
  hash_unlocked: false,
  evidence_files: null,
  cases: null,
  current_user: null,
  _version: 0
};

// GET shared state (polled by all apps every 2s)
app.get('/api/v1/sync/state', (req, res) => {
  return res.json(sharedState);
});

// PUT update a specific key in shared state
app.put('/api/v1/sync/state', (req: express.Request, res: Response) => {
  const { key, value } = req.body;
  if (!key || !(key in sharedState) || key === '_version') {
    return res.status(400).json({ error: 'Invalid sync key' });
  }
  sharedState[key] = value;
  sharedState._version = (sharedState._version as number) + 1;
  logger.info(`Cross-origin sync updated: ${key} (v${sharedState._version})`);
  return res.json({ ok: true, version: sharedState._version });
});

// Dynamic Port Binding Listener
const startServer = (portToTry: number) => {
  const srv = app.listen(portToTry, () => {
    logger.info(`SentinelX API Gateway active and listening on port ${portToTry}`);
  });
  srv.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.warn(`Port ${portToTry} in use, trying fallback port ${portToTry + 10}...`);
      startServer(portToTry + 10);
    }
  });
};

startServer(Number(PORT));
