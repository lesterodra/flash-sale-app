export type FlashSale = {
  id: number;
  product_id: number;
  sale_quantity: number;
  start_timestamp: string;
  end_timestamp: string;
  product: {
    name: string;
  };
  status: string;
};

export type Order = {
  id: number;
  email: string;
  status: string;
  product_id: number;
  product: {
    name: string;
  };
};

export type CreateOrderResponse = { job_id: string; message: string };
export type CreateOrderInput = {
  email: string;
  product_id: number;
  flash_sale_id: number;
};
