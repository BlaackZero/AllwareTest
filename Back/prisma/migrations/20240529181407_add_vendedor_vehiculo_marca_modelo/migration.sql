/*
  Warnings:

  - You are about to drop the column `ano` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `Vehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Marca` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modeloId` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patente` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendedorId` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Vendedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patente" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "vendedorId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    "modeloId" INTEGER NOT NULL,
    CONSTRAINT "Vehiculo_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "Vendedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehiculo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehiculo_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vehiculo" ("id", "marcaId", "precio") SELECT "id", "marcaId", "precio" FROM "Vehiculo";
DROP TABLE "Vehiculo";
ALTER TABLE "new_Vehiculo" RENAME TO "Vehiculo";
CREATE UNIQUE INDEX "Vehiculo_patente_key" ON "Vehiculo"("patente");
CREATE INDEX "idx_vendedorId" ON "Vehiculo"("vendedorId");
CREATE INDEX "idx_marcaId" ON "Vehiculo"("marcaId");
CREATE INDEX "idx_modeloId" ON "Vehiculo"("modeloId");
PRAGMA foreign_key_check("Vehiculo");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Vendedor_rut_key" ON "Vendedor"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Modelo_nombre_marcaId_key" ON "Modelo"("nombre", "marcaId");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");
