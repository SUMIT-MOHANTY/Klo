import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const SessionIndicator: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
      Logged in as: {user.name} ({user.email})
    </div>
  );
};
