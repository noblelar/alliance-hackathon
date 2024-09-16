-- AlterTable
ALTER TABLE "CampaignDonations" ADD COLUMN     "donorCompanyId" INTEGER;

-- AddForeignKey
ALTER TABLE "CampaignDonations" ADD CONSTRAINT "CampaignDonations_donorCompanyId_fkey" FOREIGN KEY ("donorCompanyId") REFERENCES "DonorCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;
