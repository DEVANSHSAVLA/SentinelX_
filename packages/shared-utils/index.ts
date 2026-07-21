// Shared Utility Functions for SentinelX Monorepo
import crypto from 'crypto';

export const generateCorrelationId = (): string => {
  return `corr-${crypto.randomUUID()}`;
};

export const hashSha256 = (data: string | Buffer): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^\d+]/g, '');
};

export const calculateLinguisticRisk = (text: str, triggerWords: string[]): number => {
  const textLower = text.toLowerCase();
  let hits = 0;
  for (const word of triggerWords) {
    if (textLower.includes(word.toLowerCase())) {
      hits++;
    }
  }
  return Math.min(hits / 5.0, 1.0);
};
