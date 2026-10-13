
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import GearCategorySelect from "@/components/provider/GearCategorySelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { ApiError } from "@/lib/api-error";
import {
  deleteGearItem,
  updateGearItem,
} from "@/services/gear-item.service";
import type { Category } from "@/types/category";
import type {
  GearItem,
  UpdateGearItemInput,
} from "@/types/gear-item";

interface ProviderGearTableRowProps {
  item: GearItem;
  categories: Category[];
  token: string;
}

const ProviderGearTableRow = ({
  item,
  categories,
  token,
}: ProviderGearTableRowProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState(item.name);
  const [slug, setSlug] = useState(item.slug);
  const [description, setDescription] = useState(
    item.description ?? "",
  );
  const [pricePerDay, setPricePerDay] = useState(
    item.pricePerDay,
  );
  const [stock, setStock] = useState(String(item.stock));
  const [availableStock, setAvailableStock] = useState(
    String(item.availableStock),
  );
  const [image, setImage] = useState(item.image ?? "");
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);

  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = () => {
    setName(item.name);
    setSlug(item.slug);
    setDescription(item.description ?? "");
    setPricePerDay(item.pricePerDay);
    setStock(String(item.stock));
    setAvailableStock(String(item.availableStock));
    setImage(item.image ?? "");
    setCategoryId(item.categoryId);
    setIsAvailable(item.isAvailable);
    setErrorMessage("");
    setIsEditing(false);
  };

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrorMessage("");

    const parsedPrice = Number(pricePerDay);
    const parsedStock = Number(stock);
    const parsedAvailableStock = Number(availableStock);

    if (!name.trim() || !slug.trim()) {
      setErrorMessage("Gear name and slug are required.");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage("Price per day must be greater than zero.");
      return;
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      setErrorMessage("Total stock must be a non-negative integer.");
      return;
    }

    if (
      availableStock.trim() === "" ||
      !Number.isInteger(parsedAvailableStock) ||
      parsedAvailableStock < 0 ||
      parsedAvailableStock > parsedStock
    ) {
      setErrorMessage(
        "Available stock must be between zero and total stock.",
      );
      return;
    }

    if (!categoryId) {
      setErrorMessage("Please select a category.");
      return;
    }

    const payload: UpdateGearItemInput = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      pricePerDay: parsedPrice,
      stock: parsedStock,
      availableStock: parsedAvailableStock,
      image: image.trim(),
      categoryId,
      isAvailable,
    };

    setIsSaving(true);

    try {
      await updateGearItem(token, item.id, payload);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to update gear item. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`,
    );

    if (!confirmed) return;

    setErrorMessage("");
    setIsDeleting(true);

    try {
      await deleteGearItem(token, item.id);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to delete gear item. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="size-12 rounded-md object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                No image
              </div>
            )}

            <div className="space-y-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.slug}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell>{item.category?.name ?? "Uncategorized"}</TableCell>
        <TableCell>${item.pricePerDay}</TableCell>
        <TableCell>{item.stock}</TableCell>
        <TableCell>{item.availableStock}</TableCell>

        <TableCell>
          <Badge variant={item.isAvailable ? "default" : "secondary"}>
            {item.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isDeleting || isSaving}
              onClick={() => {
                setErrorMessage("");
                setIsEditing((current) => !current);
              }}
            >
              {isEditing ? "Close" : "Edit"}
            </Button>

            <Button
              type="button"
              size="sm"
              variant="destructive"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>

          {errorMessage && !isEditing && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {errorMessage}
            </p>
          )}
        </TableCell>
      </TableRow>

      {isEditing && (
        <TableRow>
          <TableCell colSpan={7}>
            <form onSubmit={handleUpdate} className="space-y-5 py-3">
              <h3 className="text-lg font-semibold">
                Edit Gear Item
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`name-${item.id}`}>Gear Name</Label>
                  <Input
                    id={`name-${item.id}`}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`slug-${item.id}`}>Slug</Label>
                  <Input
                    id={`slug-${item.id}`}
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`price-${item.id}`}>
                    Price per Day
                  </Label>
                  <Input
                    id={`price-${item.id}`}
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={pricePerDay}
                    onChange={(event) =>
                      setPricePerDay(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`stock-${item.id}`}>Total Stock</Label>
                  <Input
                    id={`stock-${item.id}`}
                    type="number"
                    min="0"
                    step="1"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`available-${item.id}`}>
                    Available Stock
                  </Label>
                  <Input
                    id={`available-${item.id}`}
                    type="number"
                    min="0"
                    step="1"
                    value={availableStock}
                    onChange={(event) =>
                      setAvailableStock(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`category-${item.id}`}>
                    Category
                  </Label>
                  <GearCategorySelect
                    categories={categories}
                    value={categoryId}
                    onChange={setCategoryId}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${item.id}`}>
                    Description
                  </Label>
                  <Textarea
                    id={`description-${item.id}`}
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`image-${item.id}`}>Image URL</Label>
                  <Input
                    id={`image-${item.id}`}
                    type="url"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`availability-${item.id}`}>
                    Availability
                  </Label>
                  <select
                    id={`availability-${item.id}`}
                    value={String(isAvailable)}
                    onChange={(event) =>
                      setIsAvailable(event.target.value === "true")
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>
              </div>

              {errorMessage && (
                <p role="alert" className="text-sm text-destructive">
                  {errorMessage}
                </p>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isSaving}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ProviderGearTableRow;
