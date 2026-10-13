
import Image from "next/image";
import Link from "next/link";

import { getGearItems } from "@/services/gear-item.service";

export default async function Home() {
  let gearItems = null;
  let hasError = false;

  try {
    const response = await getGearItems({ page: 1, limit: 8 });
    gearItems = response.data;
  } catch (error) {
    console.error("Failed to fetch public gear items:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="bg-zinc-950 px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            GearUp Rentals
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Get the right gear for your next adventure.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Discover equipment for your next project, trip, or outdoor
            adventure. Find what you need and rent it by the day.
          </p>

          <a
            href="#available-gear"
            className="mt-8 inline-flex rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Explore Gear
          </a>
        </div>
      </section>

      {/* Featured Gear Section */}
      <section
        id="available-gear"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Explore our collection
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            Available Gear
          </h2>

          <p className="mt-3 text-zinc-600">
            Find equipment that fits your needs and budget.
          </p>
        </div>

        {/* Loading error */}
        {hasError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6"
          >
            <h3 className="font-semibold text-red-800">
              Unable to load gear
            </h3>

            <p className="mt-2 text-sm text-red-700">
              We couldn&apos;t load the gear collection. Please try again
              later.
            </p>
          </div>
        ) : gearItems && gearItems.length === 0 ? (
          /* Empty state */
          <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-zinc-900">
              No gear available yet
            </h3>

            <p className="mt-2 text-zinc-600">
              Please check back later for available rental equipment.
            </p>
          </div>
        ) : (
          /* Gear Cards */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gearItems?.map((gear) => (
              <article
                key={gear.id}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Gear Image */}
                <div className="relative aspect-4/3 bg-zinc-100">
                  {gear.image ? (
                    <Image
                      src={gear.image}
                      alt={gear.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                      No image available
                    </div>
                  )}
                </div>

                {/* Gear Information */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {gear.category?.name ?? "Uncategorized"}
                  </p>

                  <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-zinc-900">
                    {gear.name}
                  </h3>

                  <p className="mt-3 text-xl font-bold text-zinc-950">
                    ৳{Number(gear.pricePerDay).toLocaleString("en-BD")}
                    <span className="ml-1 text-sm font-normal text-zinc-500">
                      / day
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-zinc-600">
                    {gear.isAvailable && gear.availableStock > 0
                      ? `${gear.availableStock} available`
                      : "Currently unavailable"}
                  </p>

                  <Link
                    href={`/gear/${gear.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-emerald-600 hover:bg-emerald-50"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Gear Button */}
        {!hasError && gearItems && gearItems.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              View All Gear
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
