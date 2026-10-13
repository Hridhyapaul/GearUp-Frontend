
import { cookies } from "next/headers";

import ProviderOrderStatusActions from "@/components/provider/ProviderOrderStatusActions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { requireRole } from "@/lib/auth-guard";
import { getProviderRentalOrders } from "@/services/rental-order.service";
import type {
  RentalOrder,
  RentalOrderStatus,
} from "@/types/rental-order";

const statusVariants: Record<
  RentalOrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PLACED: "outline",
  PAID: "default",
  PICKED_UP: "default",
  RETURNED: "secondary",
  CANCELLED: "destructive",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

const ProviderOrdersPage = async () => {
  await requireRole(["PROVIDER"]);

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let orders: RentalOrder[] = [];
  let errorMessage = "";

  if (!token) {
    errorMessage = "Authentication required. Please log in again.";
  } else {
    try {
      orders = await getProviderRentalOrders(token);
    } catch {
      errorMessage = "Unable to load provider orders. Please try again.";
    }
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Provider Orders</h1>
        <p className="mt-2 text-muted-foreground">
          View incoming rental orders and track their current status.
        </p>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 p-5 text-sm text-destructive"
        >
          {errorMessage}
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Total Orders
              </p>
              <p className="mt-2 text-2xl font-bold">{orders.length}</p>
            </div>

            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Placed Orders
              </p>
              <p className="mt-2 text-2xl font-bold">
                {orders.filter((order) => order.status === "PLACED").length}
              </p>
            </div>

            <div className="rounded-lg border p-5">
              <p className="text-sm text-muted-foreground">
                Paid Orders
              </p>
              <p className="mt-2 text-2xl font-bold">
                {orders.filter((order) => order.status === "PAID").length}
              </p>
            </div>
          </section>

          <section className="rounded-lg border">
            <div className="border-b p-5">
              <h2 className="text-lg font-semibold">Incoming Orders</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Gear Items</TableHead>
                  <TableHead>Rental Period</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No rental orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-medium">
                          {order.id.slice(-8).toUpperCase()}
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id}>
                              <p className="font-medium">
                                {item.gearItem?.name ?? "Gear item"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          <p>{formatDate(order.startDate)}</p>
                          <p className="text-muted-foreground">
                            to {formatDate(order.endDate)}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        ${order.totalAmount}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            order.payment?.status === "PAID"
                              ? "default"
                              : order.payment?.status === "FAILED"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {order.payment?.status ?? "UNPAID"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant={statusVariants[order.status]}>
                          {order.status.replaceAll("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <ProviderOrderStatusActions
                          orderId={order.id}
                          status={order.status}
                          token={token!}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </section>
        </>
      )}
    </main>
  );
};

export default ProviderOrdersPage;
