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
import { createCaisse } from "@/actions/actions";
import CaisseActions from "@/components/caisseAction";

export default async function Page() {
  const caisses = await prisma.caisse.findMany();

  // Calcul du total des montants
  const totalMontant = caisses.reduce(
    (sum, caisse) => sum + (caisse.montant_total ?? 0),
    0
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Services
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Stock Initial
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Stock Final
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
          {caisses.map((caisse) => (
            <TableRow key={caisse.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/caisse/${caisse.id}`} passHref>
                  {caisse.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/caisse/${caisse.id}`} passHref>
                  {caisse.service}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/caisse/${caisse.id}`} passHref>
                  {caisse.stock_initial}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/caisse/${caisse.id}`} passHref>
                  {caisse.stock_final}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/caisse/${caisse.id}`} passHref>
                  {caisse.montant_total}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <CaisseActions caisseId={caisse.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100 border-t">
          <TableRow>
            <TableCell
              colSpan={4}
              className="p-4 text-right text-gray-600 font-bold"
            >
              Total
            </TableCell>
            <TableCell
              colSpan={2}
              className="p-4 text-right font-semibold text-gray-800"
            >
              {totalMontant}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createCaisse}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="service" className="block text-gray-700 font-medium">
            Service:
          </label>
          <select
            name="service"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            <option value="CANAL_PLUS">CANAL PLUS</option>
            <option value="MALIVISION">MALIVISION</option>
            <option value="WAVE">WAVE</option>
            <option value="ORANGE_MONEY">ORANGE MONEY</option>
            <option value="MOBICASH">MOBICASH</option>
            <option value="SAMA_MONEY">SAMA MONEY</option>
            <option value="CREDIT_MALITEL">CREDIT MALITEL</option>
            <option value="CREDIT_ORANGE">CREDIT ORANGE</option>
            <option value="CREDIT_TELECEL">CREDIT ORANGE</option>
            <option value="W_MG_RIA">CW_MG_RIA</option>
            {/* Ajouter d'autres options selon les valeurs de "nomService" */}
          </select>
        </div>
        <div>
          <label
            htmlFor="stock_initial"
            className="block text-gray-700 font-medium"
          >
            Stock Initial:
          </label>
          <input
            type="number"
            name="stock_initial"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="stock_final"
            className="block text-gray-700 font-medium"
          >
            Stock Final:
          </label>
          <input
            type="number"
            name="stock_final"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Montant Total:
          </label>
          <input
            type="number"
            name="montant_total"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Créer la Caisse</Button>
      </form>
    </div>
  );
}
