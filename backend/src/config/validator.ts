import { AppConfig } from './index';

const PLACEHOLDER_PATTERNS = ['placeholder', 'replace_me', 'your_', 'test_'];

const isPlaceholderValue = (value: string): boolean => {
  const lowerValue = value.toLowerCase();
  return PLACEHOLDER_PATTERNS.some(pattern => lowerValue.includes(pattern));
};

const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateConfig = (config: AppConfig): void => {
  const errors: string[] = [];

  if (!config.env.nodeEnv || config.env.nodeEnv.trim() === '') {
    errors.push('NODE_ENV is required');
  }

  if (isNaN(config.env.port) || config.env.port < 1 || config.env.port > 65535) {
    errors.push('PORT must be a valid port number (1-65535)');
  }

  if (!config.api.baseUrl || isPlaceholderValue(config.api.baseUrl)) {
    errors.push('API_BASE_URL is required and must not be a placeholder');
  } else if (!isValidUrl(config.api.baseUrl)) {
    errors.push('API_BASE_URL must be a valid HTTP/HTTPS URL');
  }

  if (!config.auth.serviceUrl || isPlaceholderValue(config.auth.serviceUrl)) {
    errors.push('AUTH_SERVICE_URL is required and must not be a placeholder');
  } else if (!isValidUrl(config.auth.serviceUrl)) {
    errors.push('AUTH_SERVICE_URL must be a valid HTTP/HTTPS URL');
  }

  if (!config.ai.azureOpenAIKey) {
    errors.push('AZURE_OPENAI_API_KEY is required');
  } else if (isPlaceholderValue(config.ai.azureOpenAIKey)) {
    console.warn('[Validator] Warning: AZURE_OPENAI_API_KEY appears to be a placeholder');
  }

  if (!config.database.url || isPlaceholderValue(config.database.url)) {
    errors.push('DATABASE_URL is required and must not be a placeholder');
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }

  console.log('[Validator] Configuration validated successfully');
};

export default validateConfig;
