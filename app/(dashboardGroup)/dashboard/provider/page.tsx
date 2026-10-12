
import { cookies } from "next/headers";

import { requireRole } from "@/lib/auth-guard";
import { getProviderGearItems } from "@/services/gear-item.service";
import { getProviderRentalOrders } from "@/services/rental-order.service";

const ProviderDashboardPage = async () => {
  const user = await requireRole(["PROVIDER"]);

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let totalGearItems = 0;
  let activeRentals = 0;
  let pendingOrders = 0;

  if (token) {
    try {
      const response = await getProviderGearItems(token);
      totalGearItems = response.data.length;
    } catch {
      totalGearItems = 0;
    }

    try {
      const orders = await getProviderRentalOrders(token);

      activeRentals = orders.filter((order) =>
        ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(
          order.status,
        ),
      ).length;

      pendingOrders = orders.filter(
        (order) => order.status === "PLACED",
      ).length;
    } catch {
      activeRentals = 0;
      pendingOrders = 0;
    }
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back, {user.name}.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Total Gear Items
          </p>

          <p className="mt-2 text-2xl font-bold">
            {totalGearItems}
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
            Pending Orders
          </p>

          <p className="mt-2 text-2xl font-bold">
            {pendingOrders}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProviderDashboardPage;
