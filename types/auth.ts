export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    loggedInUser: User;
  };
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: RegisteredUser;
  };
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: User;
}