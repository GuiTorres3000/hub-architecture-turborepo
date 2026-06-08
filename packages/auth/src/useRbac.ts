import { useCallback } from "react";
import type { Role } from "@app/types";
import { useAuthContext } from "./AuthContext";

/** RBAC helpers derived from the authenticated principal's role. */
export function useRbac() {
  const { user } = useAuthContext();

  const hasRole = useCallback(
    (...roles: Role[]) => (user ? roles.includes(user.role) : false),
    [user],
  );

  return { role: user?.role ?? null, hasRole };
}
