import { LoginRequest, LoginResponse } from "../types/auth.types";

const API_BASE_URL = "http://localhost:3000/api/auth";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Network error occurred",
      },
    };
  }
};
