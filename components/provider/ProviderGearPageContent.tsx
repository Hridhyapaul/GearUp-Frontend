
"use client";

import { useState } from "react";

import CreateGearForm from "@/components/provider/CreateGearForm";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/category";

interface ProviderGearPageContentProps {
  categories: Category[];
  token: string;
}

const ProviderGearPageContent = ({
  categories,
  token,
}: ProviderGearPageContentProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Gear Inventory</h2>

        <Button
          type="button"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Cancel" : "Add Gear"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-lg border p-5">
          <h3 className="mb-5 text-lg font-semibold">
            Create Gear Item
          </h3>

          <CreateGearForm categories={categories} token={token} />
        </div>
      )}
    </section>
  );
};

export default ProviderGearPageContent;
