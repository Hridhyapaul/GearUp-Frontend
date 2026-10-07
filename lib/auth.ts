import {
  getAccessTokenCookie,
} from "@/lib/auth-cookie";
import {
  getCurrentUser,
} from "@/services/auth.service";
import type { User } from "@/types/auth";

const getAuthenticatedUser = async (): Promise<User | null> => {
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return null;
  }

  try {
    const response = await getCurrentUser(accessToken);

    return response.data;
  } catch {
    return null;
  }
};

export { getAuthenticatedUser };