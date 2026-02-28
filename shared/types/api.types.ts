export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string> | ValidationDetail[];
}

export interface ValidationDetail {
  field: string;
  message: string;
}
