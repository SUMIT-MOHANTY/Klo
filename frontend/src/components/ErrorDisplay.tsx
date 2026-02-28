import React from "react";
import { ValidationError } from "../types/auth.types";

interface ErrorDisplayProps {
  errors: ValidationError[] | null;
  apiError?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors, apiError }) => {
  if (!errors?.length && !apiError) return null;

  return (
    <div className="error-container">
      {apiError && <div className="error-message api-error">{apiError}</div>}
      {errors?.map((error, index) => (
        <div key={index} className={`field-error field-error-${error.field}`}>
          {error.message}
        </div>
      ))}
    </div>
  );
};
