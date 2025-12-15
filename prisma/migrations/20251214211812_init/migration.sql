/*
  Warnings:

  - The values [SALA_REUNIAO,AUDITORIO] on the enum `SpaceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `durationHours` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `hubId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerHour` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `durationMinutes` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceCents` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHourCents` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "SpaceType_new" AS ENUM ('MEETING_ROOM', 'COWORKING', 'AUDITORIUM', 'LAB_TECH');
ALTER TABLE "Space" ALTER COLUMN "type" TYPE "SpaceType_new" USING ("type"::text::"SpaceType_new");
ALTER TYPE "SpaceType" RENAME TO "SpaceType_old";
ALTER TYPE "SpaceType_new" RENAME TO "SpaceType";
DROP TYPE "public"."SpaceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Hub" DROP CONSTRAINT "Hub_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_hubId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_hubId_fkey";

-- DropIndex
DROP INDEX "Hub_city_state_idx";

-- DropIndex
DROP INDEX "Reservation_hubId_status_startAt_idx";

-- DropIndex
DROP INDEX "Space_hubId_name_key";

-- DropIndex
DROP INDEX "Space_hubId_type_idx";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "durationHours",
DROP COLUMN "hubId",
DROP COLUMN "totalPrice",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "totalPriceCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "pricePerHour",
ADD COLUMN     "pricePerHourCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "hubId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE INDEX "Space_hubId_idx" ON "Space"("hubId");

-- CreateIndex
CREATE INDEX "Space_type_idx" ON "Space"("type");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hub" ADD CONSTRAINT "Hub_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "Hub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
