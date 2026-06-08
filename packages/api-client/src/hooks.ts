import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OrderSchema,
  ProductSchema,
  type Order,
  type Product,
  z,
} from "@app/types";
import { HttpClient } from "./http";
import { queryKeys } from "./queryKeys";

const ProductListSchema = z.array(ProductSchema);
const OrderListSchema = z.array(OrderSchema);

/** Catalog: list products for the marketplace. */
export function useProducts(client: HttpClient, filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () =>
      client.request<Product[]>("/products", { schema: ProductListSchema }),
  });
}

/** Orders: list a buyer's orders. */
export function useOrders(client: HttpClient, buyerId: string) {
  return useQuery({
    queryKey: queryKeys.orders.list(buyerId),
    queryFn: () =>
      client.request<Order[]>(`/orders?buyerId=${buyerId}`, { schema: OrderListSchema }),
    enabled: Boolean(buyerId),
  });
}

/** Orders: create a new draft order. */
export function useCreateOrder(client: HttpClient) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { buyerId: string; items: unknown[] }) =>
      client.request<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(input),
        schema: OrderSchema,
      }),
    onSuccess: (order) => {
      void qc.invalidateQueries({ queryKey: queryKeys.orders.list(order.buyerId) });
    },
  });
}
