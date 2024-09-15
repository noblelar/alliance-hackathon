-- AlterTable
CREATE SEQUENCE admin_id_seq;
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT nextval('admin_id_seq');
ALTER SEQUENCE admin_id_seq OWNED BY "Admin"."id";

-- AlterTable
CREATE SEQUENCE campaign_id_seq;
ALTER TABLE "Campaign" ALTER COLUMN "id" SET DEFAULT nextval('campaign_id_seq');
ALTER SEQUENCE campaign_id_seq OWNED BY "Campaign"."id";

-- AlterTable
CREATE SEQUENCE campaigndonations_id_seq;
ALTER TABLE "CampaignDonations" ALTER COLUMN "id" SET DEFAULT nextval('campaigndonations_id_seq');
ALTER SEQUENCE campaigndonations_id_seq OWNED BY "CampaignDonations"."id";

-- AlterTable
CREATE SEQUENCE donorcompany_id_seq;
ALTER TABLE "DonorCompany" ALTER COLUMN "id" SET DEFAULT nextval('donorcompany_id_seq');
ALTER SEQUENCE donorcompany_id_seq OWNED BY "DonorCompany"."id";

-- AlterTable
CREATE SEQUENCE payment_id_seq;
ALTER TABLE "Payment" ALTER COLUMN "id" SET DEFAULT nextval('payment_id_seq');
ALTER SEQUENCE payment_id_seq OWNED BY "Payment"."id";

-- AlterTable
CREATE SEQUENCE resetpasswordrequest_id_seq;
ALTER TABLE "ResetPasswordRequest" ALTER COLUMN "id" SET DEFAULT nextval('resetpasswordrequest_id_seq');
ALTER SEQUENCE resetpasswordrequest_id_seq OWNED BY "ResetPasswordRequest"."id";

-- AlterTable
CREATE SEQUENCE twofactor_id_seq;
ALTER TABLE "TwoFactor" ALTER COLUMN "id" SET DEFAULT nextval('twofactor_id_seq');
ALTER SEQUENCE twofactor_id_seq OWNED BY "TwoFactor"."id";
