import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { Role } from "@hortti/types";
import { useAuthContext } from "./AuthContext";

export interface RequireAuthProps {
  children: ReactNode;
  /** Optional role allow-list; empty means any authenticated user. */
  roles?: Role[];
  redirectTo?: string;
}

/** Route guard — redirects unauthenticated or unauthorized users. */
export function RequireAuth({ children, roles, redirectTo = "/login" }: RequireAuthProps) {
  const { user, isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}
