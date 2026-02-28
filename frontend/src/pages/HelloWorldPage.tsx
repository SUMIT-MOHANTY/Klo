import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

export const HelloWorldPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hello World!</h1>
      <p>Welcome, {user?.name || user?.email}!</p>
      <p>Your user ID is: {user?.id}</p>
      <button
        onClick={logout}
        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
};
