/*
  Warnings:

  - You are about to drop the column `digitalFile` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `hasInventory` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "digitalFile",
DROP COLUMN "hasInventory",
ADD COLUMN     "hasStock" BOOLEAN NOT NULL DEFAULT false;
