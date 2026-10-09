
import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { requireRole } from "@/lib/auth-guard";
import { getCustomerPayments } from "@/services/payment.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentStatusBadge } from "@/components/dashboard/PaymentStatusBadge";

const CustomerPaymentsPage = async () => {
  await requireRole(["CUSTOMER"]);

  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return null;
  }

  const response = await getCustomerPayments(accessToken);
  const payments = response.data;

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>

        <p className="mt-2 text-muted-foreground">
          View your rental payment history.
        </p>
      </div>

      <div className="rounded-lg border p-5">
        <p className="text-sm text-muted-foreground">
          Total Payments
        </p>

        <p className="mt-1 text-2xl font-bold">
          {response.meta.total}
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Payment History
          </h2>

          <p className="text-sm text-muted-foreground">
            Review your rental payments and their current status.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Rental Order</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.id}
                    </TableCell>

                    <TableCell>
                      {payment.rentalOrderId}
                    </TableCell>

                    <TableCell>
                      ${payment.amount}
                    </TableCell>

                    <TableCell>
                      {payment.paymentMethod}
                    </TableCell>

                      <TableCell>
                        <PaymentStatusBadge status={payment.status} />
                      </TableCell>

                    <TableCell>
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "Not paid yet"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default CustomerPaymentsPage;