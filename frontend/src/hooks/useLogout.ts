import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/tokenStorage';

export const useLogout = (): (() => void) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    clearToken();
    sessionStorage.removeItem('auth_user');
    navigate('/login');
  }, [navigate]);

  return logout;
};
