"use client";

import { useTransition } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { logoutAction } from "@/app/(authGroup)/auth/logout/actions";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();
        handleLogout();
      }}
      disabled={isPending}
    >
      {isPending ? "Logging out..." : "Logout"}
    </DropdownMenuItem>
  );
};

export { LogoutButton };