import { SetMetadata } from "@nestjs/common";
import { Role } from "@hortti/types";

export const ROLES_KEY = "hortti:roles";

/** Restrict a route/controller to one or more roles. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
