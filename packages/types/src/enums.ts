/** Persona / authorization role attached to every authenticated principal. */
export enum Role {
  BUYER = "buyer",
  SUPPLIER = "supplier",
  PRODUCER = "producer",
  TECHNICIAN = "technician",
  PROGRAM_MANAGER = "program_manager",
}

/** Commercial tier of a buyer company — drives pricing & feature access. */
export enum CompanyTier {
  MARKET = "market",
  WHOLESALE = "wholesale",
  RETAILER = "retailer",
}

/** Lifecycle of an order / negotiation. */
export enum OrderStatus {
  DRAFT = "draft",
  RFQ_OPEN = "rfq_open",
  AUCTION_OPEN = "auction_open",
  AWARDED = "awarded",
  CONFIRMED = "confirmed",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  SETTLED = "settled",
  CANCELLED = "cancelled",
}

/** Escrow / progressive-unlock state for a payment. */
export enum PaymentStatus {
  PENDING = "pending",
  ESCROWED = "escrowed",
  PARTIALLY_RELEASED = "partially_released",
  RELEASED = "released",
  REFUNDED = "refunded",
  DISPUTED = "disputed",
}
