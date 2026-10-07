import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-muted-foreground">
            Login to your GearUp account.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;