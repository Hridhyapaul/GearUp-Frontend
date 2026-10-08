import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex-1">
        <DashboardNavbar />

        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;