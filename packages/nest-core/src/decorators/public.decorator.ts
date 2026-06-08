import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "hortti:public";

/** Mark a route as publicly accessible, bypassing the JwtAuthGuard. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
