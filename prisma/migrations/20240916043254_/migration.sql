-- AlterTable
ALTER TABLE "CampaignDonations" ADD COLUMN     "agreedCompanyMoney" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agreedPersonalMoney" BOOLEAN NOT NULL DEFAULT false;
