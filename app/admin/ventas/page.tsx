import { redirect } from "next/navigation";
import OrderVentasPagination from "@/components/order/OrderVentasPagination";
import OrderVentasTable from "@/components/order/OrderVentasTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React from "react";
import { formatCurrency } from "@/src/utils";
import { FaDollarSign } from "react-icons/fa";


async function orderCount() {
  return await prisma.order.count();
}

async function getOrdersWithProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const orders = await prisma.order.findMany({
    take: pageSize,
    skip,
    include: {
      orderProducts: true,
    },
  });

  return orders;
}

async function getTotalSales() {
  const orders = await prisma.order.findMany({
    where: {
      status: true,
    },
    select: {
      total: true,
    },
  });

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  return totalSales;
}

export default async function PageVentas({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) redirect("/admin/ventas");

  const ordersData = getOrdersWithProducts(page, pageSize);
  const totalOrdersData = orderCount();
  const totalSalesData = getTotalSales();
  const [orders, totalOrders, totalSales] = await Promise.all([ordersData, totalOrdersData, totalSalesData]);
  const totalPages = Math.ceil(totalOrders / pageSize);

  if (page > totalPages) redirect("/admin/ventas");

  return (
    <>
      <Heading>Historico de ventas</Heading>
      <div className="mb-4 p-4 bg-white shadow rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <FaDollarSign className="text-green-500 text-3xl mr-3" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total de ventas</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
          </div>
        </div>
      </div>
      <OrderVentasTable orders={orders} />
      <OrderVentasPagination page={page} totalPages={totalPages} />
    </>
  );
}