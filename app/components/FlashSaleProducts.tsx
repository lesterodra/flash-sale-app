"use client";

import { createOrder, fetchFlashSales } from "@/lib/fetcher";
import { FlashSale } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MyOrders from "./MyOrders";

const formatDateAndTime = (rawDate: string): string => {
  const date = new Date(rawDate);
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return formatted;
};

export default function AvailableProducts(props: { flashSales: FlashSale[] }) {
  const { flashSales } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const { data, refetch } = useQuery({
    queryKey: [],
    queryFn: fetchFlashSales,
    initialData: flashSales,
  });
  const queryClient = useQueryClient();

  const {
    mutate,
    error: createOrderError,
    isError,
    isPending,
  } = useMutation({
    mutationFn: createOrder,
  });

  useEffect(() => {
    if (isError) {
      setErrorMessage(createOrderError.message);
    }
  }, [isError]);

  const handleBuyNow = async () => {
    if (!email) {
      setErrorMessage("Email / Username is required!");

      return;
    }
    try {
      await mutate({
        email,
        product_id: 1,
        flash_sale_id: 1,
      });

      // Add some delay in refetching
      setTimeout(() => {
        // Refetch the flash sale items to reflect the actual quantity
        refetch();

        // Manual refetch user orders after successful transaction
        queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      }, 1000);
    } catch (error) {
      console.log(error);
    }

    setErrorMessage("");
  };

  return (
    <div>
      <input
        className="mb-2 border-2 border-black rounded-lg p-1"
        placeholder="Enter your email/ username"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {data.map((flashSale) => (
        <div key={`${flashSale.id}`}>
          <div>
            <div className="flex flex-row gap-1 justify-between">
              <p className="text-xs">Product:</p>
              <div className="flex flex-col items-end">
                <p className="text-md">{flashSale.product.name}</p>
                <p className="text-xs">{flashSale.sale_quantity} available</p>
                <p className="text-xs">
                  (from {formatDateAndTime(flashSale.start_timestamp)}{" "}
                  {"until "}
                  {formatDateAndTime(flashSale.end_timestamp)})
                </p>
              </div>
            </div>
            <p className="text-red-500">{errorMessage}</p>
          </div>

          <div className="mt-4">
            <button
              onClick={() => handleBuyNow()}
              disabled={
                isPending ||
                flashSale.sale_quantity === 0 ||
                flashSale.status === "ENDED"
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 w-full"
            >
              Buy Now!
            </button>
          </div>
        </div>
      ))}
      <MyOrders email={email} />
    </div>
  );
}
