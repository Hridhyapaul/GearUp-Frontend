
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { Category } from "@/types/category";

type GearFiltersProps = {
  categories: Category[];
  initialFilters: {
    searchTerm: string;
    categoryId: string;
    minPrice?: number;
    maxPrice?: number;
    isAvailable: string;
  };
};

export default function GearFilters({
  categories,
  initialFilters,
}: GearFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [categoryId, setCategoryId] = useState(initialFilters.categoryId);
  const [minPrice, setMinPrice] = useState(
    initialFilters.minPrice?.toString() ?? "",
  );
  const [maxPrice, setMaxPrice] = useState(
    initialFilters.maxPrice?.toString() ?? "",
  );
  const [isAvailable, setIsAvailable] = useState(
    initialFilters.isAvailable,
  );
  const [validationError, setValidationError] = useState("");

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError("");

    const min = minPrice.trim() === "" ? undefined : Number(minPrice);
    const max = maxPrice.trim() === "" ? undefined : Number(maxPrice);

    if (
      (min !== undefined && (!Number.isFinite(min) || min < 0)) ||
      (max !== undefined && (!Number.isFinite(max) || max < 0))
    ) {
      setValidationError("Prices must be valid non-negative numbers.");
      return;
    }

    if (min !== undefined && max !== undefined && min > max) {
      setValidationError("Minimum price cannot exceed maximum price.");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");
    params.delete("searchTerm");
    params.delete("categoryId");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("isAvailable");

    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (categoryId) params.set("categoryId", categoryId);
    if (min !== undefined) params.set("minPrice", String(min));
    if (max !== undefined) params.set("maxPrice", String(max));
    if (isAvailable) params.set("isAvailable", isAvailable);

    const query = params.toString();
    router.push(`/gear${query ? `?${query}` : ""}`);
  }

  function clearFilters() {
    setSearchTerm("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setIsAvailable("");
    setValidationError("");
    router.push("/gear");
  }

  return (
    <form
      onSubmit={applyFilters}
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label
            htmlFor="gear-search"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Search gear
          </label>
          <input
            id="gear-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Name, description..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="gear-category"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Category
          </label>
          <select
            id="gear-category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="gear-availability"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Availability
          </label>
          <select
            id="gear-availability"
            value={isAvailable}
            onChange={(event) => setIsAvailable(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">All gear</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="gear-min-price"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Minimum price (৳)
          </label>
          <input
            id="gear-min-price"
            type="number"
            min="0"
            step="any"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Min price"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="gear-max-price"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Maximum price (৳)
          </label>
          <input
            id="gear-max-price"
            type="number"
            min="0"
            step="any"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max price"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      {validationError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {validationError}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
}
