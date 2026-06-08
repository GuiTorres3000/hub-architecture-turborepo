import { useAuth } from "@hortti/auth";
import type { Role } from "@hortti/types";

/** Returns the current principal's role (or null when unauthenticated). */
export function useRole(): Role | null {
  const { user } = useAuth();
  return user?.role ?? null;
}
