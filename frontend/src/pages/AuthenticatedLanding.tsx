import React from 'react';
import { SessionIndicator } from '../components/SessionIndicator';
import { LogoutButton } from '../components/LogoutButton';

export const AuthenticatedLanding: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>hello world</h1>
      <SessionIndicator />
      <div style={{ marginTop: '2rem' }}>
        <LogoutButton />
      </div>
    </div>
  );
};
