import { getUserOrders } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function MyOrders(props: { email: string }) {
  const { email } = props;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userOrders"],
    queryFn: () => getUserOrders(email),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(timer);
  }, [email]);

  const Orders = () => {
    return (
      <div>
        {data && data.length > 0 ? (
          <div>
            {data.map((order) => (
              <div key={`order-${order.id}`}>
                <p>Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-xs font-light">No orders available.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12">
      <div>
        <p className="text-lg font-bold">My Orders:</p>
      </div>
      {isLoading ? (
        <p className="text-xs font-light">Loading...</p>
      ) : (
        <Orders />
      )}
    </div>
  );
}
