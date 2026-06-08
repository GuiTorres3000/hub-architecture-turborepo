import { useAuth } from "@app/auth";
import type { CompanyTier } from "@app/types";

/** Returns the buyer company tier of the current principal, if any. */
export function useCompanyTier(): CompanyTier | null {
  const { user } = useAuth();
  return user?.companyTier ?? null;
}
