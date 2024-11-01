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
import { createClientCanal } from "@/actions/actions";
import ClientCanalActions from "@/components/clientAction";

export default async function Page() {
  const clients_canal = await prisma.clientCanal.findMany();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Nom
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Prenom
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Telephone
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Numero D'bonnement
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Fin D'abonnement
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients_canal.map((clientCanal) => (
            <TableRow
              key={clientCanal.id}
              className="border-b hover:bg-gray-50"
            >
              <TableCell className="p-4 text-gray-700">
                <Link href={`/clientCanal/${clientCanal.id}`} passHref>
                  {clientCanal.nom}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/clientCanal/${clientCanal.id}`} passHref>
                  {clientCanal.prenom}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/clientCanal/${clientCanal.id}`} passHref>
                  {clientCanal.telephone}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/clientCanal/${clientCanal.id}`} passHref>
                  {clientCanal.numAbonne}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/clientCanal/${clientCanal.id}`} passHref>
                  {clientCanal.finAbonn.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <ClientCanalActions clientCanalId={clientCanal.id} />
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
        action={createClientCanal}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="nom" className="block text-gray-700 font-medium">
            Nom Client:
          </label>
          <input
            type="text"
            name="nom"
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
            Numero de Telephone:
          </label>
          <input
            type="text"
            name="telephone"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Numero Abonné:
          </label>
          <input
            type="text"
            name="numAbonne"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="montant_total"
            className="block text-gray-700 font-medium"
          >
            Fin D'abonnement:
          </label>
          <input
            type="date"
            name="finAbonn"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Ajouter un nouveau client canal</Button>
      </form>
    </div>
  );
}
