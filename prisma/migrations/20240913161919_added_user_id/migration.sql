/*
  Warnings:

  - Added the required column `userId` to the `ResetPasswordRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetPasswordRequest" ADD COLUMN     "userId" INTEGER NOT NULL;
