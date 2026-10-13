
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getGearItemById } from "@/services/gear-item.service";

type GearDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  const { id } = await params;

  let gear;

  try {
    gear = await getGearItemById(id);
  } catch (error) {
    console.error("Failed to fetch gear details:", error);
    notFound();
  }

  if (!gear) {
    notFound();
  }

  const isAvailable = gear.isAvailable && gear.availableStock > 0;

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-zinc-500">
          <Link href="/" className="transition hover:text-emerald-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/gear" className="transition hover:text-emerald-700">
            All Gear
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{gear.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gear Image */}
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {gear.image ? (
              <Image
                src={gear.image}
                alt={gear.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500">
                No image available
              </div>
            )}
          </div>

          {/* Gear Information */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              {gear.category?.name ?? "Uncategorized"}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {gear.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-zinc-950">
              ৳{Number(gear.pricePerDay).toLocaleString("en-BD")}
              <span className="ml-2 text-base font-normal text-zinc-500">
                / day
              </span>
            </p>

            {/* Availability */}
            <div className="mt-5">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  isAvailable
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isAvailable ? "Available for rent" : "Currently unavailable"}
              </span>

              <p className="mt-2 text-sm text-zinc-600">
                {gear.availableStock} unit
                {gear.availableStock === 1 ? "" : "s"} available
              </p>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-zinc-200 pt-6">
              <h2 className="text-lg font-semibold text-zinc-900">
                Description
              </h2>

              <p className="mt-3 whitespace-pre-line leading-7 text-zinc-600">
                {gear.description || "No description provided for this item."}
              </p>
            </div>

            {/* Additional Information */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-6">
              <div>
                <p className="text-sm text-zinc-500">Total stock</p>
                <p className="mt-1 font-semibold text-zinc-900">
                  {gear.stock} units
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Rental rate</p>
                <p className="mt-1 font-semibold text-zinc-900">
                  Per day
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isAvailable ? (
                <Link
                  href={`/checkout?gearId=${encodeURIComponent(gear.id)}`}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Rent Now
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-lg bg-zinc-300 px-6 py-3 font-semibold text-zinc-600"
                >
                  Currently Unavailable
                </button>
              )}

              <Link
                href="/gear"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                Browse More Gear
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
