import { useAuthContext } from "./AuthContext";

/** Primary auth hook — exposes the current principal and login/logout. */
export function useAuth() {
  return useAuthContext();
}
