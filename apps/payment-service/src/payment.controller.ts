import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "@app/nest-core";
import { Role, type Payment } from "@app/types";
import { PaymentService } from "./payment.service";

@ApiTags("payments")
@ApiBearerAuth()
@Controller("payments")
export class PaymentController {
  constructor(private readonly payments: PaymentService) {}

  @Roles(Role.BUYER)
  @Post(":orderId/escrow")
  escrow(
    @Param("orderId") orderId: string,
    @Body() body: { amountCents: number },
  ): Promise<Payment> {
    return this.payments.escrow(orderId, body.amountCents);
  }

  @Roles(Role.BUYER, Role.PROGRAM_MANAGER)
  @Post(":orderId/release")
  release(
    @Param("orderId") orderId: string,
    @Body() body: { amountCents: number },
  ): Promise<Payment> {
    return this.payments.release(orderId, body.amountCents);
  }
}
