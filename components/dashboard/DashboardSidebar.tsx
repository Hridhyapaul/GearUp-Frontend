import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { dashboardNavItems } from "@/lib/dashboard-nav";
import { requireUser } from "@/lib/auth-guard";

const DashboardSidebar = async () => {
  const user = await requireUser();
  const navItems = dashboardNavItems[user.role];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-2">
          <h2 className="text-lg font-semibold">
            GearUp
          </h2>

          <p className="text-sm text-muted-foreground">
            {user.role} Dashboard
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-2 text-sm text-muted-foreground">
          {user.email}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export { DashboardSidebar };