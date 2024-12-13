/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDigital` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'AVAILABLE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "basePrice",
DROP COLUMN "isDigital",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "comparePrice" DOUBLE PRECISION,
ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "hasInventory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhysical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "margin" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "revenue" DOUBLE PRECISION,
ADD COLUMN     "status" "ProductStatus" NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;
