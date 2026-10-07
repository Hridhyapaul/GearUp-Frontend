"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { loginAction } from "@/app/(authGroup)/auth/login/actions";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await loginAction({
        email,
        password,
      });

      if (!response.success || !response.data) {
        setError(response.message ?? "Login failed.");
        return;
      }

      const redirectTo = searchParams.get("redirect");

      if (redirectTo) {
        router.push(redirectTo);
        return;
      }

      const role = response.data.user.role;

      if (role === "ADMIN") {
        router.push("/dashboard/admin");
        return;
      }

      if (role === "PROVIDER") {
        router.push("/dashboard/provider");
        return;
      }

      router.push("/dashboard/customer");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export { LoginForm };
