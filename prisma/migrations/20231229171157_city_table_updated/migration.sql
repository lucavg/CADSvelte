/*
  Warnings:

  - You are about to drop the column `cityId` on the `LostCat` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `catCityId` to the `LostCat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerCityId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LostCat" DROP CONSTRAINT "LostCat_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_cityId_fkey";

-- AlterTable
ALTER TABLE "LostCat" DROP COLUMN "cityId",
ADD COLUMN     "catCityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "cityId",
ADD COLUMN     "ownerCityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_ownerCityId_fkey" FOREIGN KEY ("ownerCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostCat" ADD CONSTRAINT "LostCat_catCityId_fkey" FOREIGN KEY ("catCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
