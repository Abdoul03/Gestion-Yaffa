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
// import { Button } from "@/components/ui/button";

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
        <TableCaption className="text-lg font-semibold text-gray-700 py-4">
          La Caisse.
        </TableCaption>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <Link href={`/caisse/${caisses}`}>clicke</Link> */}
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
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100 border-t">
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
        </TableFooter>
      </Table>
    </div>
  );
}
