import {
  CreateOrderInput,
  CreateOrderResponse,
  FlashSale,
  Order,
} from "@/app/types";

export async function fetchFlashSales(): Promise<FlashSale[]> {
  const res = await fetch("http://localhost:3000/flash-sales", {
    cache: "no-store",
  });

  const flashSales: FlashSale[] = await res.json();

  return flashSales;
}

export async function getUserOrders(email: string): Promise<Order[]> {
  const res = await fetch(`http://localhost:3000/orders?email=${email}`, {
    cache: "no-store",
  });

  const orders: Order[] = await res.json();

  return orders;
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResponse> {
  const response = await fetch("http://localhost:3000/orders", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const jobDetails: CreateOrderResponse = await response.json();
  console.log({ jobDetails });

  if (!response.ok) {
    throw new Error(jobDetails.message);
  }

  return jobDetails;
}
