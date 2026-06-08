import { z } from "zod";
import { CompanyTier, OrderStatus, PaymentStatus, Role } from "./enums";

export const RoleSchema = z.nativeEnum(Role);
export const CompanyTierSchema = z.nativeEnum(CompanyTier);
export const OrderStatusSchema = z.nativeEnum(OrderStatus);
export const PaymentStatusSchema = z.nativeEnum(PaymentStatus);

export const JwtPayloadSchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
  role: RoleSchema,
  companyId: z.string().uuid().nullable(),
  companyTier: CompanyTierSchema.nullable(),
  iat: z.number().int().optional(),
  exp: z.number().int().optional(),
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number().int().positive(),
});
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const ProductSchema = z.object({
  id: z.string().uuid(),
  sku: z.string(),
  name: z.string().min(1),
  category: z.string(),
  unit: z.string(),
  basePriceCents: z.number().int().nonnegative(),
  supplierId: z.string().uuid(),
  active: z.boolean().default(true),
});
export type Product = z.infer<typeof ProductSchema>;

export const OrderSchema = z.object({
  id: z.string().uuid(),
  buyerId: z.string().uuid(),
  supplierId: z.string().uuid().nullable(),
  status: OrderStatusSchema,
  totalCents: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});
export type Order = z.infer<typeof OrderSchema>;

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  status: PaymentStatusSchema,
  escrowedCents: z.number().int().nonnegative(),
  releasedCents: z.number().int().nonnegative(),
});
export type Payment = z.infer<typeof PaymentSchema>;
