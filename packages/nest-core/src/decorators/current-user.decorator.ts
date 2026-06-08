import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { JwtPayload } from "@app/types";

/** Inject the authenticated principal (set by JwtAuthGuard) into a handler. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
  },
);
