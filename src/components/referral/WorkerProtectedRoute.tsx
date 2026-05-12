/**
 * WorkerProtectedRoute — guards worker/admin referral routes.
 * Uses AuthContext to check if user is logged in via the custom backend.
 * If requireAdmin is set, also checks role === "admin".
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface WorkerProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function WorkerProtectedRoute({ children, requireAdmin }: WorkerProtectedRouteProps) {
  const { isAuthed, role } = useAuth();

  if (!isAuthed) return <Navigate to="/worker/login" replace />;
  if (requireAdmin && role !== "admin") return <Navigate to="/worker/dashboard" replace />;
  if (!requireAdmin && role !== "worker" && role !== "admin") return <Navigate to="/account" replace />;

  return <>{children}</>;
}
