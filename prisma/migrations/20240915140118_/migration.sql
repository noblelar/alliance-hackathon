-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'PAYPAL', 'APPLEPAY', 'GOOGLEPAY', 'BANKACCOUNT');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "acceptPaymentMethods" "PaymentMethod"[],
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "targetAmount" SET DEFAULT 0;
