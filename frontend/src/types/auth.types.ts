export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
    };
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}
