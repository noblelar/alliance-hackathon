-- AlterTable
ALTER TABLE "DonorCompany" ADD COLUMN     "declineMessage" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "status" SET DEFAULT 'UNVERIFIED';
