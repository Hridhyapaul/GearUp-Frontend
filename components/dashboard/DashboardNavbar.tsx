import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { requireUser } from "@/lib/auth-guard";
import { LogoutButton } from "./LogoutButton";

const DashboardNavbar = async () => {
  const user = await requireUser();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <SidebarTrigger />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-md px-2 py-1.5 outline-none hover:bg-muted">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {user.role}
              </p>
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div>
              <p className="font-medium">{user.name}</p>

              <p className="text-xs font-normal text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export { DashboardNavbar };