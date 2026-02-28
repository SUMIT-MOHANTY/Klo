import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface ApiErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  timestamp: string;
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response<ApiErrorResponse> => {
  const timestamp = new Date().toISOString();

  if (err instanceof ZodError) {
    const details: Record<string, string> = {};
    err.errors.forEach((e) => {
      if (e.path[0]) {
        details[e.path[0] as string] = e.message;
      }
    });

    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
        details,
      },
      timestamp,
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    },
    timestamp,
  });
};
