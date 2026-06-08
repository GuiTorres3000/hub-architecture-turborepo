import { useAuth } from "@hortti/auth";
import type { CompanyTier } from "@hortti/types";

/** Returns the buyer company tier of the current principal, if any. */
export function useCompanyTier(): CompanyTier | null {
  const { user } = useAuth();
  return user?.companyTier ?? null;
}
