import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/auth";
import type { UserRole } from "@/types/auth";

const requireUser = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
};

const requireRole = async (allowedRoles: UserRole[]) => {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
};

export {
  requireUser,
  requireRole,
};