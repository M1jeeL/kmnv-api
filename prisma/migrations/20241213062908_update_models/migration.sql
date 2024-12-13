/*
  Warnings:

  - Added the required column `updatedAt` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "variantId" INTEGER,
ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "margin" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
