import Image from "next/image";
import { cookies } from "next/headers";

import ProviderGearPageContent from "@/components/provider/ProviderGearPageContent";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/lib/auth-guard";
import { getAllCategories } from "@/services/category.service";
import { getProviderGearItems } from "@/services/gear-item.service";
import type { Category } from "@/types/category";
import type { GearItem } from "@/types/gear-item";
import ProviderGearTableRow from "@/components/provider/ProviderGearTableRow";

const ProviderGearPage = async () => {
  await requireRole(["PROVIDER"]);

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let gearItems: GearItem[] = [];
  let categories: Category[] = [];

  if (token) {
    try {
      const response = await getProviderGearItems(token);
      gearItems = response.data;
    } catch {
      gearItems = [];
    }
  }

  try {
    categories = await getAllCategories();
  } catch {
    categories = [];
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Gear</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your gear inventory and availability.
        </p>
      </div>

      <section className="rounded-lg border p-5">
        <p className="text-sm text-muted-foreground">Total Gear Items</p>

        <p className="mt-2 text-2xl font-bold">{gearItems.length}</p>
      </section>

      {token ? (
        <ProviderGearPageContent categories={categories} token={token} />
      ) : (
        <p className="text-sm text-destructive">
          Authentication required to create a gear item.
        </p>
      )}

      <section className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Available Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {gearItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No gear items found.
                </TableCell>
              </TableRow>
            ) : (
              gearItems.map((item) => (
                <ProviderGearTableRow
                  key={item.id}
                  item={item}
                  categories={categories}
                  token={token!}
                />
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default ProviderGearPage;
