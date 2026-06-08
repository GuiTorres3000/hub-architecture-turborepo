import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser, Public, ZodValidationPipe } from "@hortti/nest-core";
import {
  LoginRequestSchema,
  type AuthTokens,
  type JwtPayload,
  type LoginRequest,
} from "@hortti/types";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post("login")
  login(
    @Body(new ZodValidationPipe(LoginRequestSchema)) body: LoginRequest,
  ): Promise<AuthTokens> {
    return this.auth.login(body);
  }

  @Get("me")
  me(@CurrentUser() user: JwtPayload): JwtPayload {
    return user;
  }
}
