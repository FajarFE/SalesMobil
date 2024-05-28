/*
  Warnings:

  - You are about to drop the `CarSpecification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarSpecification" DROP CONSTRAINT "CarSpecification_postProductId_fkey";

-- DropTable
DROP TABLE "CarSpecification";
