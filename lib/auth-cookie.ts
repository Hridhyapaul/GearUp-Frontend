import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";

const setAccessTokenCookie = async (accessToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
};

const removeAccessTokenCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
};

export {
  setAccessTokenCookie,
  getAccessTokenCookie,
  removeAccessTokenCookie,
};