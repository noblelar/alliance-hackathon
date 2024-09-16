/*
  Warnings:

  - A unique constraint covering the columns `[donationId]` on the table `CampaignDonations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CampaignDonations_donationId_key" ON "CampaignDonations"("donationId");
