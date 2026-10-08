import { requireRole } from "@/lib/auth-guard";
import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { getCustomerRentalOrders } from "@/services/rental-order.service";

const CustomerDashboardPage = async () => {
  const user = await requireRole(["CUSTOMER"]);
  const accessToken = await getAccessTokenCookie();

  let totalRentals = 0;
  let activeRentals = 0;

  if (accessToken) {
    const response = await getCustomerRentalOrders(accessToken);
    console.log("Customer rental orders response:", response);

    totalRentals = response.meta.total;

    activeRentals = response.data.filter(
      (order) =>
        order.status !== "RETURNED" &&
        order.status !== "CANCELLED",
    ).length;
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back, {user.name}.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Total Rentals
          </p>

          <p className="mt-2 text-2xl font-bold">
            {totalRentals}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Active Rentals
          </p>

          <p className="mt-2 text-2xl font-bold">
            {activeRentals}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Total Payments
          </p>

          <p className="mt-2 text-2xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Reviews
          </p>

          <p className="mt-2 text-2xl font-bold">
            0
          </p>
        </div>
      </section>
    </main>
  );
};

export default CustomerDashboardPage;