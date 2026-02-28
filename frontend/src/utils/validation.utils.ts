import { ValidationError } from "../types/auth.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= MIN_PASSWORD_LENGTH;
};

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (!validatePassword(password)) {
    errors.push({ field: "password", message: "Password must be at least 8 characters long" });
  }

  return errors;
};
