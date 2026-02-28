import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validators/login.validator";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const result = loginSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          details: result.error.flatten().fieldErrors,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Mock authentication - replace with actual auth logic
    const { email } = result.data;
    
    return res.status(200).json({
      success: true,
      data: {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: "1",
          email,
        },
      },
      message: "Login successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
