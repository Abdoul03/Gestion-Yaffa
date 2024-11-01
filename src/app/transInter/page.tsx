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
import { createTransInter } from "@/actions/actions";
import TransInterActions from "@/components/transInterAction";

export default async function Page() {
  const transInters = await prisma.transInternation.findMany();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Initial
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Nom du service
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Transferé
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Reçu
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date de debit
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date de Fin
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Solde
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Decouvert
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Credit
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Debit caisse
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Debit BNDA
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transInters.map((trans) => (
            <TableRow key={trans.id} className="border-b hover:bg-gray-50">
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.montant_initial}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.nom_service}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.montant_trans}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.montant_recus}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.date_debut.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.date_fin?.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.soldes}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.Decouvert}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.credit}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.debit_caisse}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/transInter/${trans.id}`} passHref>
                  {trans.debit_BNDA}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <TransInterActions transInterId={trans.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createTransInter}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="nom" className="block text-gray-700 font-medium">
            Nom Service:
          </label>
          <select
            name="nom_service"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selectionne un service</option>
            <option value="WESTERUNION">WESTERUNION</option>
            <option value="MONEYGRAM">MONEYGRAM</option>
            <option value="RIA">RIA</option>
            {/* Ajouter d'autres options selon les valeurs de "nomService" */}
          </select>
        </div>
        <div>
          <label
            htmlFor="Montant Initial"
            className="block text-gray-700 font-medium"
          >
            Montant Initial:
          </label>
          <input
            type="number"
            name="montant_initial"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Montant Transferer:
          </label>
          <input
            type="number"
            name="montant_trans"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Montant Reçu:
          </label>
          <input
            type="number"
            name="montant_recus"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Date de debut:
          </label>
          <input
            type="date"
            name="date_debut"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Date de fin:
          </label>
          <input
            type="date"
            name="date_fin"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="solde" className="block text-gray-700 font-medium">
            Solde:
          </label>
          <input
            type="number"
            name="soldes"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Decouvert:
          </label>
          <input
            type="number"
            name="Decouvert"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Credit:
          </label>
          <input
            type="number"
            name="credit"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Debit Caisse:
          </label>
          <input
            type="number"
            name="debit_caisses"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            Debit BNDA:
          </label>
          <input
            type="number"
            name="debit_BNDA"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Ajouter service de l'enpreprise</Button>
      </form>
    </div>
  );
}
