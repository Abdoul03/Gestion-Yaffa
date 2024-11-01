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
import { createCommision } from "@/actions/actions";
import CommissionActions from "@/components/commissionAction";

export default async function Page() {
  const commissions = await prisma.commissionDuMois.findMany();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Non du Service
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Debit
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Sold
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commissions.map((commission) => (
            <TableRow key={commission.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/commission/${commission.id}`} passHref>
                  {commission.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/commission/${commission.id}`} passHref>
                  {commission.mom_service}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/commission/${commission.id}`} passHref>
                  {commission.debit}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/commission/${commission.id}`} passHref>
                  {commission.montant}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/commission/${commission.id}`} passHref>
                  {commission.sold}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <CommissionActions commissionId={commission.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter className="bg-gray-100 border-t">
          <TableRow>
            <TableCell
              colSpan={4}
              className="p-4 text-right font-semibold text-gray-600"
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
        </TableFooter> */}
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createCommision}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="service" className="block text-gray-700 font-medium">
            Nom du service:
          </label>
          <select
            name="mom_service"
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
          <label htmlFor="prenom" className="block text-gray-700 font-medium">
            debit:
          </label>
          <input
            type="number"
            name="debit"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="montant" className="block text-gray-700 font-medium">
            Montant:
          </label>
          <input
            type="number"
            name="montant"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="sold" className="block text-gray-700 font-medium">
            Solde:
          </label>
          <input
            type="number"
            name="sold"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Ajouter une commission</Button>
      </form>
    </div>
  );
}
