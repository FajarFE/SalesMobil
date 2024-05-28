/*
  Warnings:

  - You are about to drop the column `categoryId` on the `PostProduct` table. All the data in the column will be lost.
  - Made the column `description` on table `PostProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PostProduct" DROP COLUMN "categoryId",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;
