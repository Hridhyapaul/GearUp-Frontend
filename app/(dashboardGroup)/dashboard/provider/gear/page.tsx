
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
        <p className="text-sm text-muted-foreground">
          Total Gear Items
        </p>

        <p className="mt-2 text-2xl font-bold">
          {gearItems.length}
        </p>
      </section>

      {token ? (
        <ProviderGearPageContent
          categories={categories}
          token={token}
        />
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {gearItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No gear items found.
                </TableCell>
              </TableRow>
            ) : (
              gearItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="size-12 rounded-md object-cover"
                      />

                      <div className="space-y-1">
                        <p className="font-medium">{item.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {item.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{item.category.name}</TableCell>

                  <TableCell>${item.pricePerDay}</TableCell>

                  <TableCell>{item.stock}</TableCell>

                  <TableCell>{item.availableStock}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        item.isAvailable ? "default" : "secondary"
                      }
                    >
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default ProviderGearPage;
