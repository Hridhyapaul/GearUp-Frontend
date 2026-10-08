import type { UserRole } from "@/types/auth";

interface DashboardNavItem {
  title: string;
  href: string;
}

const dashboardNavItems: Record<UserRole, DashboardNavItem[]> = {
  CUSTOMER: [
    {
      title: "Overview",
      href: "/dashboard/customer",
    },
    {
      title: "My Rentals",
      href: "/dashboard/customer/rentals",
    },
    {
      title: "Payments",
      href: "/dashboard/customer/payments",
    },
    {
      title: "Reviews",
      href: "/dashboard/customer/reviews",
    },
  ],

  PROVIDER: [
    {
      title: "Overview",
      href: "/dashboard/provider",
    },
    {
      title: "My Gear",
      href: "/dashboard/provider/gear",
    },
    {
      title: "Orders",
      href: "/dashboard/provider/orders",
    },
  ],

  ADMIN: [
    {
      title: "Overview",
      href: "/dashboard/admin",
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
    },
    {
      title: "Gear",
      href: "/dashboard/admin/gear",
    },
    {
      title: "Orders",
      href: "/dashboard/admin/orders",
    },
  ],
};

export type { DashboardNavItem };

export { dashboardNavItems };