/*
  Warnings:

  - You are about to drop the `ExteriorImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InteriorImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformanceImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SafetyImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TechnologyImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExteriorImage" DROP CONSTRAINT "ExteriorImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ExteriorImage" DROP CONSTRAINT "ExteriorImage_postProductId_fkey";

-- DropForeignKey
ALTER TABLE "InteriorImage" DROP CONSTRAINT "InteriorImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "InteriorImage" DROP CONSTRAINT "InteriorImage_postProductId_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceImage" DROP CONSTRAINT "PerformanceImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceImage" DROP CONSTRAINT "PerformanceImage_postProductId_fkey";

-- DropForeignKey
ALTER TABLE "SafetyImage" DROP CONSTRAINT "SafetyImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "SafetyImage" DROP CONSTRAINT "SafetyImage_postProductId_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyImage" DROP CONSTRAINT "TechnologyImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyImage" DROP CONSTRAINT "TechnologyImage_postProductId_fkey";

-- AlterTable
ALTER TABLE "PostProduct" ADD COLUMN     "exteriorImage" TEXT[],
ADD COLUMN     "interiorImage" TEXT[],
ADD COLUMN     "performance" TEXT[],
ADD COLUMN     "safety" TEXT[],
ADD COLUMN     "technology" TEXT[];

-- DropTable
DROP TABLE "ExteriorImage";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "InteriorImage";

-- DropTable
DROP TABLE "PerformanceImage";

-- DropTable
DROP TABLE "SafetyImage";

-- DropTable
DROP TABLE "TechnologyImage";
