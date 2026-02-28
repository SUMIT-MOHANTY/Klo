import 'dotenv/config';
import { validateConfig } from './validator';
import { getMockServiceUrl } from './mockFallback';

interface EnvConfig {
  nodeEnv: string;
  port: number;
}

interface ApiConfig {
  baseUrl: string;
}

interface AuthConfig {
  serviceUrl: string;
}

interface AiConfig {
  azureOpenAIKey: string;
}

interface DatabaseConfig {
  url: string;
}

export interface AppConfig {
  env: EnvConfig;
  api: ApiConfig;
  auth: AuthConfig;
  ai: AiConfig;
  database: DatabaseConfig;
}

const loadConfig = (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = parseInt(process.env.PORT || '3000', 10);

  let baseUrl = process.env.API_BASE_URL || 'http://localhost:3001/api';
  let authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3002/auth';
  let azureOpenAIKey = process.env.AZURE_OPENAI_API_KEY || '';
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/appdb';

  const isPlaceholder = (value: string): boolean => {
    return value.includes('placeholder') || value.includes('replace_me');
  };

  if (isPlaceholder(azureOpenAIKey)) {
    console.warn('[Config] Using mock AI service - AZURE_OPENAI_API_KEY is placeholder');
    baseUrl = getMockServiceUrl('ai');
  }

  if (nodeEnv === 'development' && isPlaceholder(authServiceUrl)) {
    console.warn('[Config] Using mock auth service in development');
    authServiceUrl = getMockServiceUrl('auth');
  }

  const config: AppConfig = {
    env: { nodeEnv, port },
    api: { baseUrl },
    auth: { serviceUrl: authServiceUrl },
    ai: { azureOpenAIKey },
    database: { url: databaseUrl }
  };

  validateConfig(config);
  return config;
};

export const config = loadConfig();
export default config;
