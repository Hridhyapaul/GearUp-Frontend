"use server";

import { setAccessTokenCookie } from "@/lib/auth-cookie";
import { loginUser } from "@/services/auth.service";
import type { LoginPayload } from "@/types/auth";

const loginAction = async (payload: LoginPayload) => {
  try {
    const response = await loginUser(payload);

    await setAccessTokenCookie(response.data.accessToken);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export { loginAction };