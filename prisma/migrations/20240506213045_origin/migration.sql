/*
  Warnings:

  - Added the required column `origin` to the `LogModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogModel" ADD COLUMN     "origin" TEXT NOT NULL;
