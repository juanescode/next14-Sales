"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatesOrderItem from "@/components/order/LatesOrderItem";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
  });

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
        <h1 className="text-center mt-20 text-6xl font-black">Ordenes listas</h1>

        <Logo />

        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatesOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes listas</p>
        )}
      </>
    );
}
