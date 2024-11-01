import { prisma } from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createUvAbonne } from "@/actions/actions";
import UvAbonneActions from "@/components/uvAbonne";

export default async function Page() {
  const uvAbonnes = await prisma.uvAbonnement.findMany();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Produit
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uvAbonnes.map((uvAbonne) => (
            <TableRow key={uvAbonne.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/uvAbonnement/${uvAbonne.id}`} passHref>
                  {uvAbonne.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/uvAbonnement/${uvAbonne.id}`} passHref>
                  {uvAbonne.produit}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/uvAbonnement/${uvAbonne.id}`} passHref>
                  {uvAbonne.montant}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <UvAbonneActions UvAbonneId={uvAbonne.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createUvAbonne}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="service" className="block text-gray-700 font-medium">
            Produit:
          </label>
          <select
            name="produit"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            <option value="CANAL_PLUS">CANAL PLUS</option>
            <option value="MALIVISION">MALIVISION</option>
            {/* Ajouter d'autres options selon les valeurs de "nomService" */}
          </select>
        </div>
        <div>
          <label
            htmlFor="stock_initial"
            className="block text-gray-700 font-medium"
          >
            Montant:
          </label>
          <input
            type="number"
            name="montant"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Créer la Caisse</Button>
      </form>
    </div>
  );
}
