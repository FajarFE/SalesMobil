-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ARCHIVED', 'PUBLISHED', 'DRAFT');

-- CreateTable
CREATE TABLE "CarSpecification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postProductId" TEXT NOT NULL,

    CONSTRAINT "CarSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostProduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "categoryId" TEXT,
    "exteriorImage" TEXT[],
    "interiorImage" TEXT[],
    "headline" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "technology" TEXT[],
    "safety" TEXT[],
    "performance" TEXT[],
    "userId" TEXT NOT NULL,
    "carBrandId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CarBrand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarSpecification" ADD CONSTRAINT "CarSpecification_postProductId_fkey" FOREIGN KEY ("postProductId") REFERENCES "PostProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostProduct" ADD CONSTRAINT "PostProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostProduct" ADD CONSTRAINT "PostProduct_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "CarBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarBrand" ADD CONSTRAINT "CarBrand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
