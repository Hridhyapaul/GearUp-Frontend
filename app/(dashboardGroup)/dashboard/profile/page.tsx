import { requireUser } from "@/lib/auth-guard";

const ProfilePage = async () => {
  const user = await requireUser();

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          View your account information.
        </p>
      </div>

      <div className="max-w-2xl rounded-lg border p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>

            <p className="font-medium">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;