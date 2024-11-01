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
import { createPrepayee } from "@/actions/actions";
import PrepayeeActions from "@/components/prepayeeAction";

export default async function Page() {
  const prepayees = await prisma.prepayee.findMany();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Non du Client
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Initial
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Depensé
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Restant
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prepayees.map((prepayee) => (
            <TableRow key={prepayee.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/prepayee/${prepayee.id}`} passHref>
                  {prepayee.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/prepayee/${prepayee.id}`} passHref>
                  {prepayee.nom_client}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/prepayee/${prepayee.id}`} passHref>
                  {prepayee.montant_initial}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/prepayee/${prepayee.id}`} passHref>
                  {prepayee.montant_depense}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/prepayee/${prepayee.id}`} passHref>
                  {prepayee.montant_restant}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <PrepayeeActions prepayeeId={prepayee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createPrepayee}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="nom" className="block text-gray-700 font-medium">
            Nom Client:
          </label>
          <input
            type="text"
            name="nom_client"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-gray-700 font-medium">
            Montant Initial:
          </label>
          <input
            type="text"
            name="montant_initial"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Montant Depensé:
          </label>
          <input
            type="text"
            name="montant_depense"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Montant Restant:
          </label>
          <input
            type="number"
            name="montant_restant"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Creer Prepayee</Button>
      </form>
    </div>
  );
}
