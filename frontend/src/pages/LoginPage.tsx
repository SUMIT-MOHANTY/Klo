import React, { useState } from "react";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { login } from "../services/api.service";
import { validateLoginForm } from "../utils/validation.utils";
import { ValidationError } from "../types/auth.types";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationError[] | null>(null);
  const [apiError, setApiError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setApiError(undefined);

    const validationErrors = validateLoginForm(email, password);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const response = await login({ email, password });
    setLoading(false);

    if (response.success) {
      console.log("Login successful:", response.data);
      alert("Login successful!");
    } else {
      if (response.error?.details) {
        const fieldErrors: ValidationError[] = Object.entries(response.error.details).map(
          ([field, message]) => ({ field, message })
        );
        setErrors(fieldErrors);
      } else {
        setApiError(response.error?.message);
      }
    }
  };

  const getFieldError = (field: string) => errors?.find((e) => e.field === field);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ErrorDisplay errors={errors} apiError={apiError} />
        
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {getFieldError("email") && (
            <span className="field-error">{getFieldError("email")?.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {getFieldError("password") && (
            <span className="field-error">{getFieldError("password")?.message}</span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
