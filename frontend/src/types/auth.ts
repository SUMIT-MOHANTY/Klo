export interface User {
  id: string;
  email: string;
  name: string;
}

export interface TokenData {
  token: string;
  expiresAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
