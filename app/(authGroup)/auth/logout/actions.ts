"use server";

import { removeAccessTokenCookie } from "@/lib/auth-cookie";
import { redirect } from "next/navigation";

const logoutAction = async () => {
  await removeAccessTokenCookie();

  redirect("/auth/login");
};

export { logoutAction };