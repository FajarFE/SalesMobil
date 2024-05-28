-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "carBrandId" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "CarBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
