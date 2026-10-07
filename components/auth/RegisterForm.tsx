"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { registerAction } from "@/app/(authGroup)/auth/register/actions";

const RegisterForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!name || !email || !password || !role) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await registerAction({
        name,
        email,
        password,
        role,
      });

      if (!response.success || !response.data) {
        setError(response.message ?? "Registration failed.");
        return;
      }

      router.push("/auth/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a password"
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Account Type</Label>

        <Select
          value={role}
          onValueChange={(value) =>
            setRole(value as "CUSTOMER" | "PROVIDER")
          }
        >
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="CUSTOMER">
              Customer
            </SelectItem>

            <SelectItem value="PROVIDER">
              Provider
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export { RegisterForm };