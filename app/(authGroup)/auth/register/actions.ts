"use server";

import { registerUser } from "@/services/auth.service";
import type { RegisterPayload } from "@/types/auth";

const registerAction = async (payload: RegisterPayload) => {
  try {
    const response = await registerUser(payload);

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
};

export { registerAction };