// Shared API Validation Contracts (Zod Schemas) for SentinelX API Gateway
import { z } from 'zod';

export const ScamAnalyseSchema = z.object({
  caller_number: z.string().min(5, 'Caller number required'),
  call_transcript: z.string().min(3, 'Call transcript text required'),
  origin_ip: z.string().optional(),
  sip_headers: z.record(z.string()).optional(),
});

export const CurrencyScanSchema = z.object({
  image_base64: z.string().min(10, 'Base64 image required'),
  claimed_denomination: z.number().int().positive(),
  device_metadata: z.string().optional(),
});

export const GraphAnalyseSchema = z.object({
  seed_node_id: z.string().min(1, 'Seed node ID required'),
});

export const CitizenAssessSchema = z.object({
  message_text: z.string().min(2, 'Message text required'),
  language: z.string().default('en'),
});

export const GeoEventSchema = z.object({
  incident_type: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  risk_score: z.number().min(0).max(1).default(0.0),
  description: z.string().optional(),
});

export const EvidencePackageSchema = z.object({
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
