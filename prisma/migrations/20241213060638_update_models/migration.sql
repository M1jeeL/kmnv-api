/*
  Warnings:

  - You are about to drop the column `barcode` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `margin` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VariantOption" DROP CONSTRAINT "VariantOption_variantId_fkey";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "barcode",
DROP COLUMN "margin",
ALTER COLUMN "stock" SET DEFAULT 0;

-- DropTable
DROP TABLE "Variant";

-- DropTable
DROP TABLE "VariantOption";

-- CreateTable
CREATE TABLE "ProductVariantOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "ProductVariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "reservedStock" INTEGER NOT NULL DEFAULT 0,
    "incomingStock" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_variantId_locationId_key" ON "Stock"("variantId", "locationId");

-- AddForeignKey
ALTER TABLE "ProductVariantOption" ADD CONSTRAINT "ProductVariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLocation" ADD CONSTRAINT "StockLocation_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "StockLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
