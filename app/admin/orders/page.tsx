"use client";
import useSWR from "swr";
import Heading from "@/components/ui/Heading";
import OrderCard from "@/components/order/OrderCard";
import { OrderWithProducts } from "@/src/types";
import { revalidatePath } from "next/cache";

export default function OrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return (
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 mt-4 font-bold">Cargando...</h2>
        <p className="text-zinc-600 dark:text-zinc-400 font-semibold">
          Obteniendo datos de las nuevas ordenes
        </p>
      </div>
    );

  if (data)
    return (
      <>
        <Heading>Administrar ordenes</Heading>
        

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay ordenes pendientes</p>
        )}
      </>
    );
}
