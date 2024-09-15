/*
  Warnings:

  - The `used` column on the `TwoFactor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TwoFactor" DROP COLUMN "used",
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
