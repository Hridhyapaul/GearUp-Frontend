
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "@/lib/api-error";
import GearCategorySelect from "@/components/provider/GearCategorySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createGearItem } from "@/services/gear-item.service";
import type { Category } from "@/types/category";

interface CreateGearFormProps {
  categories: Category[];
  token: string;
}

type FieldName =
  | "name"
  | "slug"
  | "pricePerDay"
  | "stock"
  | "availableStock"
  | "categoryId";

type FieldErrors = Partial<Record<FieldName, string>>;

const CreateGearForm = ({
  categories,
  token,
}: CreateGearFormProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [stock, setStock] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleNameChange = (value: string) => {
    setName(value);

    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    );

    clearFieldError("name");
    clearFieldError("slug");
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};

    const normalizedName = name.trim();
    const normalizedSlug = slug.trim();
    const parsedPrice = Number(pricePerDay);
    const parsedStock = Number(stock);
    const parsedAvailableStock = Number(availableStock);

    if (!normalizedName) {
      errors.name = "Gear name is required.";
    }

    if (!normalizedSlug) {
      errors.slug = "Slug is required.";
    }

    if (
      pricePerDay.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice <= 0
    ) {
      errors.pricePerDay =
        "Price per day must be greater than zero.";
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      errors.stock =
        "Total stock must be a non-negative integer.";
    }

    if (
      availableStock.trim() === "" ||
      !Number.isInteger(parsedAvailableStock) ||
      parsedAvailableStock < 0
    ) {
      errors.availableStock =
        "Available stock must be a non-negative integer.";
    } else if (
      Number.isInteger(parsedStock) &&
      parsedStock >= 0 &&
      parsedAvailableStock > parsedStock
    ) {
      errors.availableStock =
        "Available stock cannot exceed total stock.";
    }

    if (!categoryId) {
      errors.categoryId = "Please select a category.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createGearItem(token, {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
        pricePerDay: Number(pricePerDay),
        stock: Number(stock),
        availableStock: Number(availableStock),
        image: image.trim() || undefined,
        categoryId,
      });

      setSuccessMessage(
        response.message || "Gear item created successfully.",
      );

      router.refresh();
      router.push("/dashboard/provider/gear");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Unable to create gear item. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Gear Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => handleNameChange(event.target.value)}
          placeholder="Enter gear name"
          required
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={fieldErrors.name ? "border-destructive" : ""}
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(event) => {
            setSlug(event.target.value);
            clearFieldError("slug");
          }}
          placeholder="gear-name"
          required
          aria-invalid={Boolean(fieldErrors.slug)}
          aria-describedby={fieldErrors.slug ? "slug-error" : undefined}
          className={fieldErrors.slug ? "border-destructive" : ""}
        />
        {fieldErrors.slug && (
          <p id="slug-error" role="alert" className="text-sm text-destructive">
            {fieldErrors.slug}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe your gear"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricePerDay">Price per Day</Label>
        <Input
          id="pricePerDay"
          type="number"
          min="0.01"
          step="0.01"
          value={pricePerDay}
          onChange={(event) => {
            setPricePerDay(event.target.value);
            clearFieldError("pricePerDay");
          }}
          required
          aria-invalid={Boolean(fieldErrors.pricePerDay)}
          aria-describedby={
            fieldErrors.pricePerDay ? "pricePerDay-error" : undefined
          }
          className={
            fieldErrors.pricePerDay ? "border-destructive" : ""
          }
        />
        {fieldErrors.pricePerDay && (
          <p
            id="pricePerDay-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {fieldErrors.pricePerDay}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Total Stock</Label>
        <Input
          id="stock"
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(event) => {
            setStock(event.target.value);
            clearFieldError("stock");
            clearFieldError("availableStock");
          }}
          required
          aria-invalid={Boolean(fieldErrors.stock)}
          aria-describedby={fieldErrors.stock ? "stock-error" : undefined}
          className={fieldErrors.stock ? "border-destructive" : ""}
        />
        {fieldErrors.stock && (
          <p id="stock-error" role="alert" className="text-sm text-destructive">
            {fieldErrors.stock}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="availableStock">Available Stock</Label>
        <Input
          id="availableStock"
          type="number"
          min="0"
          step="1"
          value={availableStock}
          onChange={(event) => {
            setAvailableStock(event.target.value);
            clearFieldError("availableStock");
          }}
          required
          aria-invalid={Boolean(fieldErrors.availableStock)}
          aria-describedby={
            fieldErrors.availableStock
              ? "availableStock-error"
              : undefined
          }
          className={
            fieldErrors.availableStock ? "border-destructive" : ""
          }
        />
        {fieldErrors.availableStock && (
          <p
            id="availableStock-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {fieldErrors.availableStock}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <GearCategorySelect
          categories={categories}
          value={categoryId}
          onChange={(value) => {
            setCategoryId(value);
            clearFieldError("categoryId");
          }}
        />
        {fieldErrors.categoryId && (
          <p
            id="categoryId-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {fieldErrors.categoryId}
          </p>
        )}
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p role="status" className="text-sm text-green-600">
          {successMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || categories.length === 0}
      >
        {isSubmitting ? "Creating..." : "Create Gear Item"}
      </Button>
    </form>
  );
};

export default CreateGearForm;
