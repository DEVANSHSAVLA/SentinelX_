// Shared Domain Types across SentinelX Monorepo

export enum UserRole {
  CITIZEN = 'CITIZEN',
  OFFICER = 'OFFICER',
  ANALYST = 'ANALYST',
  ADMIN = 'ADMIN',
}

export enum HazardLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum CaseStatus {
  OPEN = 'OPEN',
  UNDER_INVESTIGATION = 'UNDER_INVESTIGATION',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface ScamSessionPayload {
  callerNumber: string;
  callTranscript: string;
  originIp?: string;
  sipHeaders?: Record<string, string>;
}

export interface ScamAnalysisResult {
  scamScore: number;
  isScam: boolean;
  urgencyLevel: string;
  impersonatedEntity?: string;
  clonedVoiceDetected: boolean;
  confidence: number;
}

export interface CurrencyScanRequest {
  imageBase64: string;
  claimedDenomination: number;
  deviceMetadata?: string;
}

export interface FailedMarker {
  markerName: string;
  details: string;
}

export interface CurrencyScanResult {
  isCounterfeit: boolean;
  confidence: number;
  detectedDenomination: number;
  serialNumber: string;
  failedMarkers: FailedMarker[];
  cvPipelineTelemetry: Record<string, any>;
}

export interface GraphAnalyseRequest {
  seedNodeId: string;
}

export interface FraudGraphResult {
  riskScore: number;
  isMuleRing: boolean;
  cyclesDetected: number;
  hopsTraced: number;
  flaggedAccounts: string[];
  rationale: string;
}

export interface ThreatEvaluatePayload {
  scamLinguisticScore: number;
  cliSpoofed: boolean;
  voiceDeepfakeScore: number;
  graphRiskScore: number;
  currencyCounterfeitScore: number;
}

export interface ThreatEvaluateResult {
  compositeThreatScore: number;
  hazardLevel: HazardLevel;
  recommendedMitigations: string[];
  systemDirectives: string[];
}

export interface GeoIncidentEvent {
  id: string;
  incidentType: string;
  latitude: number;
  longitude: number;
  riskScore: number;
  description?: string;
}

export interface EvidencePackagePayload {
  caseNumber: string;
  incidentType: string;
  reporterName: string;
  callTranscript: string;
  threatLevel: string;
  scamScore: number;
  deepfakeScore: number;
  moneyTrail: Array<{
    tx_id: string;
    from_account: string;
    to_account: string;
    amount: number;
    timestamp: string;
  }>;
}

export interface EvidencePackageResult {
  status: string;
  pdfFilePath: string;
  sha256Hash: string;
  digitalSignature: string;
  signedBy: string;
}
