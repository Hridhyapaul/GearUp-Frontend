import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Create Your Account
          </h1>

          <p className="text-muted-foreground">
            Join GearUp and start renting sports gear.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;