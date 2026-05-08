import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: UserRole;
}) {
  const { isAuthed, role } = useAuth();
  const location = useLocation();

  if (!isAuthed) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  if (requireRole && role !== requireRole) return <Navigate to="/account" replace />;
  return <>{children}</>;
}

