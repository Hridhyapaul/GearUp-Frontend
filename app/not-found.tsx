
import Link from "next/link";
import { House, TentTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "@/components/shared/GoBackButton";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
        <TentTree className="h-10 w-10 text-muted-foreground" />
      </div>

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Error 404
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        Oops! You’re off the trail.
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <House className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <GoBackButton />
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        GearUp · Find your next adventure
      </p>
    </main>
  );
};

export default NotFound;
