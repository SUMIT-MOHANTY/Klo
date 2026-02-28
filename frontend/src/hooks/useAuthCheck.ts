import { useState, useEffect } from 'react';
import { getToken, isTokenValid } from '../utils/tokenStorage';
import type { User } from '../types/auth';

interface AuthCheckResult {
  isValid: boolean;
  user: User | null;
}

export const useAuthCheck = (): AuthCheckResult => {
  const [result, setResult] = useState<AuthCheckResult>({ isValid: false, user: null });

  useEffect(() => {
    const tokenData = getToken();
    if (tokenData && isTokenValid()) {
      // In real app, decode JWT or fetch user from token
      const storedUser = sessionStorage.getItem('auth_user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      setResult({ isValid: true, user });
    } else {
      setResult({ isValid: false, user: null });
    }
  }, []);

  return result;
};
