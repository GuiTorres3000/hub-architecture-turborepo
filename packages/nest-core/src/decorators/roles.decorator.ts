import { SetMetadata } from "@nestjs/common";
import { Role } from "@app/types";

export const ROLES_KEY = "app:roles";

/** Restrict a route/controller to one or more roles. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
