-- CreateTable
CREATE TABLE "DonationRefund" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "campaignDonationsId" INTEGER NOT NULL,
    "fulfilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationRefund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DonationRefund_campaignDonationsId_key" ON "DonationRefund"("campaignDonationsId");

-- AddForeignKey
ALTER TABLE "DonationRefund" ADD CONSTRAINT "DonationRefund_campaignDonationsId_fkey" FOREIGN KEY ("campaignDonationsId") REFERENCES "CampaignDonations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
