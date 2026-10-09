import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { requireRole } from "@/lib/auth-guard";
import { getCustomerRentalOrders } from "@/services/rental-order.service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentalOrder } from "@/types/rental-order";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

const CustomerRentalsPage = async () => {
  await requireRole(["CUSTOMER"]);

  const accessToken = await getAccessTokenCookie();

  let rentalOrders: RentalOrder[] = [];

  if (accessToken) {
    const response = await getCustomerRentalOrders(accessToken);

    rentalOrders = response.data;
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Rentals</h1>

        <p className="mt-2 text-muted-foreground">
          View and track your rental orders.
        </p>
      </div>

      {rentalOrders.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-lg font-semibold">No rentals found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your rental history will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Rental Period</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rentalOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>

                  <TableCell>
                    {new Date(order.startDate).toLocaleDateString()} -{" "}
                    {new Date(order.endDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{order.items.length}</TableCell>

                  <TableCell>${order.totalAmount}</TableCell>

                  <TableCell>{order.status}</TableCell>

                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/customer/rentals/${order.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
};

export default CustomerRentalsPage;
