/*
  Warnings:

  - You are about to drop the column `hasStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "hasStock",
ADD COLUMN     "isTaxable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "trackStock" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "size",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "margin" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT;

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
