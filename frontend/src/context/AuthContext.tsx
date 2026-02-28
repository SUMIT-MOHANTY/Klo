import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '../types/auth';
import { setToken, getToken, clearToken, isTokenValid } from '../utils/tokenStorage';

interface AuthContextType extends AuthState {
  login: (token: string, user: User, expiresAt?: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenData = getToken();
    if (tokenData && isTokenValid()) {
      const storedUser = sessionStorage.getItem('auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' && !e.newValue) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token: string, userData: User, expiresAt: number = Date.now() + 3600000) => {
    setToken(token, expiresAt);
    sessionStorage.setItem('auth_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearToken();
    sessionStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
