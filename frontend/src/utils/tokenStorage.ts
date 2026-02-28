const TOKEN_KEY = 'auth_token';

export const setToken = (token: string, expiresAt: number): void => {
  const data = JSON.stringify({ token, expiresAt });
  sessionStorage.setItem(TOKEN_KEY, data);
};

export const getToken = (): { token: string; expiresAt: number } | null => {
  const data = sessionStorage.getItem(TOKEN_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  const tokenData = getToken();
  if (!tokenData) return false;
  return Date.now() < tokenData.expiresAt;
};
