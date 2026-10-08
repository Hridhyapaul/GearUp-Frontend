import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { requireRole } from "@/lib/auth-guard";
import { getRentalOrderById } from "@/services/rental-order.service";

interface RentalDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RentalDetailsPage = async ({ params }: RentalDetailsPageProps) => {
  await requireRole(["CUSTOMER"]);

  const { id } = await params;
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return null;
  }

  const response = await getRentalOrderById(accessToken, id);

  const order = response.data.rentalOrder;

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Details</h1>

        <p className="mt-2 text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Status</p>

          <p className="mt-1 font-medium">{order.status}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Rental Start</p>

          <p className="mt-1 font-medium">
            {new Date(order.startDate).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Rental End</p>

          <p className="mt-1 font-medium">
            {new Date(order.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Total Amount</p>

          <p className="mt-1 font-medium">${order.totalAmount}</p>
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Rental Items</h2>

          <p className="text-sm text-muted-foreground">
            Gear included in this rental order.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gear</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price / Day</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={item.gearItem.image}
                          alt={item.gearItem.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium">{item.gearItem.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {item.gearItem.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{item.quantity}</TableCell>

                  <TableCell>${item.pricePerDay}</TableCell>

                  <TableCell className="font-medium">
                    ${item.subtotal}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default RentalDetailsPage;
