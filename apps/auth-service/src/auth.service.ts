import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  CompanyTier,
  Role,
  type AuthTokens,
  type JwtPayload,
  type LoginRequest,
} from "@app/types";

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Validate credentials and mint access/refresh tokens.
   * NOTE: stubbed user lookup — wire to @app/prisma + password hashing.
   */
  async login({ email, password }: LoginRequest): Promise<AuthTokens> {
    const user = await this.findUser(email, password);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      companyTier: user.companyTier,
    };

    const accessToken = await this.jwt.signAsync(payload, { expiresIn: "15m" });
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: "7d" });

    return { accessToken, refreshToken, expiresIn: 15 * 60 };
  }

  private async findUser(email: string, _password: string) {
    return {
      id: "00000000-0000-0000-0000-000000000001",
      email,
      role: Role.BUYER,
      companyId: "00000000-0000-0000-0000-0000000000aa",
      companyTier: CompanyTier.WHOLESALE,
    };
  }
}
