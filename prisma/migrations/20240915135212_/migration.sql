/*
  Warnings:

  - Changed the type of `targetAmount` on the `Campaign` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "image" DROP NOT NULL,
DROP COLUMN "targetAmount",
ADD COLUMN     "targetAmount" DOUBLE PRECISION NOT NULL;
