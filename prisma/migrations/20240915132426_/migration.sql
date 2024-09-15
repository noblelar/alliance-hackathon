/*
  Warnings:

  - A unique constraint covering the columns `[campaignDonationsId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_campaignDonationsId_key" ON "Payment"("campaignDonationsId");
