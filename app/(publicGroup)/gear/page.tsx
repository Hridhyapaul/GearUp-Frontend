
import Image from "next/image";
import Link from "next/link";

import { getGearItems } from "@/services/gear-item.service";
import { getAllCategories } from "@/services/category.service";
import GearFilters from "@/components/gear/GearFilters";
import type { Category } from "@/types/category";

type GearPageProps = {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
  }>;
};

export default async function GearPage({ searchParams }: GearPageProps) {
  const params = await searchParams;

  const parsedPage = Number(params.page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedMinPrice =
    params.minPrice !== undefined && params.minPrice !== ""
      ? Number(params.minPrice)
      : undefined;

  const parsedMaxPrice =
    params.maxPrice !== undefined && params.maxPrice !== ""
      ? Number(params.maxPrice)
      : undefined;

  const filters = {
    searchTerm: params.searchTerm ?? "",
    categoryId: params.categoryId ?? "",
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
    isAvailable: params.isAvailable ?? "",
  };

  let gearItems = null;
  let meta = null;
  let categories: Category[] = [];
  let hasError = false;

  try {
    const [gearResponse, categoryResponse] = await Promise.all([
      getGearItems({
        page: currentPage,
        limit: 8,
        searchTerm: filters.searchTerm || undefined,
        categoryId: filters.categoryId || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        isAvailable:
          filters.isAvailable === "true"
            ? true
            : filters.isAvailable === "false"
              ? false
              : undefined,
      }),
      getAllCategories(100),
    ]);

    gearItems = gearResponse.data;
    meta = gearResponse.meta;
    categories = categoryResponse;
  } catch (error) {
    console.error("Failed to fetch gear listing:", error);
    hasError = true;
  }

  const totalPages = meta?.totalPages ?? 1;
  const activePage = meta?.page ?? currentPage;

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-zinc-500">
            <Link href="/" className="hover:text-emerald-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900">All Gear</span>
          </nav>

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Explore our collection
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            All Gear Items
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-600">
            Search and filter rental equipment to find the right gear for
            your next project or adventure.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <GearFilters
          categories={categories}
          initialFilters={filters}
        />

        {hasError ? (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6"
          >
            <h2 className="font-semibold text-red-800">
              Unable to load gear items
            </h2>
            <p className="mt-2 text-sm text-red-700">
              We couldn&apos;t load the gear collection or categories.
              Please try again later.
            </p>
            <Link
              href="/gear"
              className="mt-4 inline-flex rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
            >
              Clear Filters and Try Again
            </Link>
          </div>
        ) : gearItems && gearItems.length === 0 ? (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-zinc-900">
              No gear items found
            </h2>
            <p className="mt-2 text-zinc-600">
              Try changing your search or filters.
            </p>
            <Link
              href="/gear"
              className="mt-5 inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 mt-8 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-zinc-900">
                Browse Gear
              </h2>
              <p className="text-sm text-zinc-500">
                {meta?.total ?? 0} items · Page {activePage} of {totalPages}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {gearItems?.map((gear) => (
                <article
                  key={gear.id}
                  className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
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

            {totalPages > 1 && (
              <nav
                aria-label="Gear pagination"
                className="mt-12 flex flex-wrap items-center justify-center gap-2"
              >
                {activePage > 1 ? (
                  <Link
                    href={buildPageUrl(activePage - 1, filters)}
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-emerald-600 hover:text-emerald-700"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-zinc-400">
                    Previous
                  </span>
                )}

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={buildPageUrl(pageNumber, filters)}
                      aria-current={
                        pageNumber === activePage ? "page" : undefined
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        pageNumber === activePage
                          ? "bg-emerald-600 text-white"
                          : "border border-zinc-300 bg-white text-zinc-700 hover:border-emerald-600 hover:text-emerald-700"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  ),
                )}

                {activePage < totalPages ? (
                  <Link
                    href={buildPageUrl(activePage + 1, filters)}
                    className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-emerald-600 hover:text-emerald-700"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-zinc-400">
                    Next
                  </span>
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function buildPageUrl(
  page: number,
  filters: {
    searchTerm: string;
    categoryId: string;
    minPrice?: number;
    maxPrice?: number;
    isAvailable: string;
  },
) {
  const params = new URLSearchParams();

  if (page > 1) params.set("page", String(page));
  if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.minPrice !== undefined)
    params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.set("maxPrice", String(filters.maxPrice));
  if (filters.isAvailable) params.set("isAvailable", filters.isAvailable);

  const query = params.toString();
  return `/gear${query ? `?${query}` : ""}`;
}
