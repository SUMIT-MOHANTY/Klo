const MOCK_BASE_URL = 'http://localhost:4000/mock';

export interface MockServiceEndpoints {
  auth: string;
  ai: string;
  api: string;
}

const mockEndpoints: MockServiceEndpoints = {
  auth: `${MOCK_BASE_URL}/auth`,
  ai: `${MOCK_BASE_URL}/ai`,
  api: `${MOCK_BASE_URL}/api`
};

export const getMockServiceUrl = (serviceType: string): string => {
  switch (serviceType.toLowerCase()) {
    case 'auth':
      return mockEndpoints.auth;
    case 'ai':
    case 'azure':
    case 'openai':
      return mockEndpoints.ai;
    case 'api':
    case 'backend':
      return mockEndpoints.api;
    default:
      console.warn(`[MockFallback] Unknown service type: ${serviceType}, using default mock`);
      return `${MOCK_BASE_URL}/${serviceType}`;
  }
};

export const isMockMode = (configValue: string): boolean => {
  return configValue.includes('placeholder') || 
         configValue.includes('localhost:4000/mock') ||
         configValue.includes('replace_me');
};

export const getMockConfig = () => ({
  isEnabled: true,
  baseUrl: MOCK_BASE_URL,
  endpoints: mockEndpoints
});

export default getMockServiceUrl;
