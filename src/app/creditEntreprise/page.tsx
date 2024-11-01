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
import { createCreditEntreprise } from "@/actions/actions";
import CreditEntrepriseActions from "@/components/creditEntreAction";

export default async function Page() {
  const creditEntreprises = await prisma.creditEntreprise.findMany();

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
              Prenom du Client
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Motif
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Payer
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Restant
            </TableHead>
            {/* <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Solde
            </TableHead> */}
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditEntreprises.map((crediEntre) => (
            <TableRow key={crediEntre.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.nomClient}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.prenomClient}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.motif}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.montant}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.montant_paye}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.montant_restant}
                </Link>
              </TableCell>
              {/* <TableCell>
                <Link href={`/creditEntreprise/${crediEntre.id}`} passHref>
                  {crediEntre.solde}
                </Link>
              </TableCell> */}
              <TableCell className="p-4 text-gray-700">
                <CreditEntrepriseActions creditEntrId={crediEntre.id} />
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
        action={createCreditEntreprise}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="nom" className="block text-gray-700 font-medium">
            Nom Client:
          </label>
          <input
            type="text"
            name="nomClient"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-gray-700 font-medium">
            Prenom:
          </label>
          <input
            type="text"
            name="prenom"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Motif:
          </label>
          <input
            type="text"
            name="motif"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
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
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Montant payer:
          </label>
          <input
            type="number"
            name="montant_paye"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Montant restant:
          </label>
          <input
            type="number"
            name="montant_restant"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            solde:
          </label>
          <input
            type="number"
            name="montant_restant"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        <Button type="submit">Ajouter un nouveau credit</Button>
      </form>
    </div>
  );
}
