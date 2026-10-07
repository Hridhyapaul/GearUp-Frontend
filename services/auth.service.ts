import { apiRequest } from "@/lib/api";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";

const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  return apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const getCurrentUser = async (
  token: string,
): Promise<CurrentUserResponse> => {
  return apiRequest<CurrentUserResponse>("/auth/me", {
    method: "GET",
    token,
  });
};

export {
  loginUser,
  registerUser,
  getCurrentUser,
};