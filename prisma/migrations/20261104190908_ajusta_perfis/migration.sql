/*
  Warnings:

  - You are about to drop the column `department` on the `admin_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `enrollment` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matricula]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricula` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'STUDENT';
ALTER TYPE "Role" ADD VALUE 'DRIVER';

-- DropIndex
DROP INDEX "students_enrollment_key";

-- AlterTable
ALTER TABLE "admin_profiles" DROP COLUMN "department",
ADD COLUMN     "cargo" TEXT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "course",
DROP COLUMN "enrollment",
ADD COLUMN     "curso" TEXT,
ADD COLUMN     "matricula" TEXT NOT NULL;

-- DropEnum
DROP TYPE "role";

-- CreateIndex
CREATE UNIQUE INDEX "students_matricula_key" ON "students"("matricula");
