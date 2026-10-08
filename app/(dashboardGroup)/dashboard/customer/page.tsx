import { requireRole } from "@/lib/auth-guard";

const CustomerDashboardPage = async () => {
  const user = await requireRole(["CUSTOMER"]);

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
    </main>
  );
};

export default CustomerDashboardPage;