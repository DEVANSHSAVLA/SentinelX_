// Shared Configuration Settings across SentinelX Monorepo

export interface ServiceConfig {
  env: string;
  port: number;
  jwtSecret: string;
  redisUrl: string;
  databaseUrl: string;
  neo4jUri: string;
  kafkaBrokers: string[];
}

export const getServiceConfig = (): ServiceConfig => ({
  env: process.env.NODE_ENV || process.env.ENVIRONMENT || 'development',
  port: Number(process.env.PORT) || 8000,
  jwtSecret: process.env.JWT_SECRET || 'sentinelx_enterprise_jwt_secret_key_2026',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379/0',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5432/sentinelx?schema=public',
  neo4jUri: process.env.NEO4J_URI || 'bolt://localhost:7687',
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
});
