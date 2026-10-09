import { requireRole } from "@/lib/auth-guard";
import { getAccessTokenCookie } from "@/lib/auth-cookie";
import { getCustomerRentalOrders } from "@/services/rental-order.service";
import { getCustomerPayments } from "@/services/payment.service";
import { getReviews } from "@/services/review.service";

const CustomerDashboardPage = async () => {
  const user = await requireRole(["CUSTOMER"]);
  const accessToken = await getAccessTokenCookie();

  let totalRentals = 0;
  let activeRentals = 0;
  let totalPayments = 0;
  let totalReviews = 0;
  let hasApiError = false;

  if (accessToken) {
    const [rentalResult, paymentResult, reviewResult] =
      await Promise.allSettled([
        getCustomerRentalOrders(accessToken),
        getCustomerPayments(accessToken),
        getReviews(accessToken),
      ]);

    if (rentalResult.status === "fulfilled") {
      const rentalResponse = rentalResult.value;

      totalRentals = rentalResponse.meta.total;

      activeRentals = rentalResponse.data.filter(
        (order) => order.status !== "RETURNED" && order.status !== "CANCELLED",
      ).length;
    } else {
      hasApiError = true;
    }

    if (paymentResult.status === "fulfilled") {
      totalPayments = paymentResult.value.meta.total;
    } else {
      hasApiError = true;
    }

    if (reviewResult.status === "fulfilled") {
      totalReviews = reviewResult.value.data.filter(
        (review) => review.customerId === user.id,
      ).length;
    } else {
      hasApiError = true;
    }
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>

        <p className="mt-2 text-muted-foreground">Welcome back, {user.name}.</p>
      </div>

      {hasApiError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          Unable to load all dashboard statistics. Please try again later.
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Total Rentals</p>
          <p className="mt-2 text-2xl font-bold">{totalRentals}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Active Rentals</p>
          <p className="mt-2 text-2xl font-bold">{activeRentals}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Total Payments</p>
          <p className="mt-2 text-2xl font-bold">{totalPayments}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Reviews</p>
          <p className="mt-2 text-2xl font-bold">{totalReviews}</p>
        </div>
      </section>
    </main>
  );
};

export default CustomerDashboardPage;
