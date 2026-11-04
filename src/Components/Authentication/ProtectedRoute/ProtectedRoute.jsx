import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ReadOnlyDemo from '../../Demo/ReadOnlyDemo';
export default function ProtectedRoute({ children }) {
  const { user, profile, loading, isDemo } = useAuth();
  const { pathname } = useLocation();
  if (loading) return <p className="container py-5" role="status">Checking your session…</p>;
  if (!user) return <Navigate to="/login" replace />;
  const needsOwner = pathname.startsWith('/profileSuperAdmin');
  const needsAdmin = needsOwner || pathname.startsWith('/profileAdmin') || pathname === '/stock' || pathname === '/userTable' || /^\/home\/(create|modify)/i.test(pathname);
  if (needsOwner && profile?.rol !== 'superAdmin') return <Navigate to="/home" replace />;
  if (needsAdmin && !['superAdmin','admin'].includes(profile?.rol)) return <Navigate to="/home" replace />;
  return isDemo ? <ReadOnlyDemo key={pathname}>{children}</ReadOnlyDemo> : children;
}
