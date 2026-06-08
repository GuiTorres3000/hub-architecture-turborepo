/** Centralized, type-safe React Query key factory. */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown>) => ["products", "list", filters ?? {}] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  orders: {
    all: ["orders"] as const,
    list: (buyerId: string) => ["orders", "list", buyerId] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },
  payments: {
    detail: (orderId: string) => ["payments", "detail", orderId] as const,
  },
} as const;
