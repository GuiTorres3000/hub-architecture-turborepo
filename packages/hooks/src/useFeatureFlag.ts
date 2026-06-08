import { useMemo } from "react";
import { useAuth } from "@app/auth";
import { CompanyTier, Role } from "@app/types";

/** Static flag matrix — swap for a remote provider in production. */
const FLAGS: Record<string, { roles?: Role[]; tiers?: CompanyTier[] }> = {
  "rfq.auctions": { roles: [Role.BUYER], tiers: [CompanyTier.WHOLESALE, CompanyTier.RETAILER] },
  "credit.ruralAccess": { roles: [Role.PRODUCER, Role.PROGRAM_MANAGER] },
  "payment.progressiveUnlock": { roles: [Role.BUYER, Role.SUPPLIER] },
  "traceability.timeline": {},
};

/** Evaluate a named feature flag against the current principal. */
export function useFeatureFlag(flag: string): boolean {
  const { user } = useAuth();
  return useMemo(() => {
    const rule = FLAGS[flag];
    if (!rule) return false;
    if (!user) return false;
    if (rule.roles && !rule.roles.includes(user.role)) return false;
    if (rule.tiers && (!user.companyTier || !rule.tiers.includes(user.companyTier))) return false;
    return true;
  }, [flag, user]);
}
