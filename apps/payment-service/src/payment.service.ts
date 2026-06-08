import { Injectable, NotFoundException } from "@nestjs/common";
import { PaymentStatus, type Payment } from "@hortti/types";

@Injectable()
export class PaymentService {
  /** Move funds into escrow when an order is confirmed. */
  async escrow(orderId: string, amountCents: number): Promise<Payment> {
    return {
      id: crypto.randomUUID(),
      orderId,
      status: PaymentStatus.ESCROWED,
      escrowedCents: amountCents,
      releasedCents: 0,
    };
  }

  /**
   * Progressive unlock — release a tranche of escrowed funds as delivery
   * milestones are met. Stubbed; wire to @hortti/prisma `payment` model.
   */
  async release(orderId: string, amountCents: number): Promise<Payment> {
    if (amountCents <= 0) throw new NotFoundException("Nothing to release");
    return {
      id: crypto.randomUUID(),
      orderId,
      status: PaymentStatus.PARTIALLY_RELEASED,
      escrowedCents: 0,
      releasedCents: amountCents,
    };
  }
}
