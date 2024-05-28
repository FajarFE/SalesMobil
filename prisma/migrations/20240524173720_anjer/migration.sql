/*
  Warnings:

  - You are about to drop the column `exteriorImage` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `interiorImage` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `performance` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `safety` on the `PostProduct` table. All the data in the column will be lost.
  - You are about to drop the column `technology` on the `PostProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostProduct" DROP CONSTRAINT "PostProduct_carBrandId_fkey";

-- AlterTable
ALTER TABLE "PostProduct" DROP COLUMN "exteriorImage",
DROP COLUMN "headline",
DROP COLUMN "image",
DROP COLUMN "interiorImage",
DROP COLUMN "performance",
DROP COLUMN "safety",
DROP COLUMN "technology";

-- CreateTable
CREATE TABLE "ExteriorImage" (
    "id" TEXT NOT NULL,
    "postProductId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "ExteriorImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteriorImage" (
    "id" TEXT NOT NULL,
    "postProductId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "InteriorImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyImage" (
    "id" TEXT NOT NULL,
    "postProductId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "TechnologyImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyImage" (
    "id" TEXT NOT NULL,
    "postProductId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "SafetyImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceImage" (
    "id" TEXT NOT NULL,
    "postProductId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "PerformanceImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostProduct" ADD CONSTRAINT "PostProduct_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "CarBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExteriorImage" ADD CONSTRAINT "ExteriorImage_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExteriorImage" ADD CONSTRAINT "ExteriorImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteriorImage" ADD CONSTRAINT "InteriorImage_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteriorImage" ADD CONSTRAINT "InteriorImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyImage" ADD CONSTRAINT "TechnologyImage_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyImage" ADD CONSTRAINT "TechnologyImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyImage" ADD CONSTRAINT "SafetyImage_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyImage" ADD CONSTRAINT "SafetyImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceImage" ADD CONSTRAINT "PerformanceImage_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceImage" ADD CONSTRAINT "PerformanceImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
