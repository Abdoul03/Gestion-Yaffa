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
import { createServiceEntreprise } from "@/actions/actions";
import ServiceEntrepriseActions from "@/components/serviceAction";

export default async function Page() {
  const serviceEntreprises = await prisma.serviceEntreprise.findMany();

  // Calcul du total en additionnant solde_a_nouveau et montant_final pour chaque enregistrement
  const totalMontant = serviceEntreprises.some((service) => {
    // Ajoute solde_a_nouveau et montant_final (ou 0 si montant_final est null)
    return service.solde_a_nouveau + (service.montant_final || 0);
  }, 0);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 p-3">
      <Table className="flex-grow bg-white shadow-md rounded-lg overflow-hidden w-full">
        <TableHeader className="bg-gray-100 border-b">
          <TableRow>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Date
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Non Service
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Solde A Nouveau
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Montant Final
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Total
            </TableHead>
            <TableHead className="p-4 text-left text-gray-600 font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceEntreprises.map((serviceEtrp) => (
            <TableRow
              key={serviceEtrp.id}
              className="border-b hover:bg-gray-50"
            >
              <TableCell className="p-4 text-gray-700">
                <Link href={`/serviceEntreprise/${serviceEtrp.id}`} passHref>
                  {serviceEtrp.date.toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/serviceEntreprise/${serviceEtrp.id}`} passHref>
                  {serviceEtrp.mom_service}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/serviceEntreprise/${serviceEtrp.id}`} passHref>
                  {serviceEtrp.solde_a_nouveau}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/serviceEntreprise/${serviceEtrp.id}`} passHref>
                  {serviceEtrp.montant_final}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <Link href={`/serviceEntreprise/${serviceEtrp.id}`} passHref>
                  {totalMontant}
                </Link>
              </TableCell>
              <TableCell className="p-4 text-gray-700">
                <ServiceEntrepriseActions serviceEntreId={serviceEtrp.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* formulaire de creation d'une caisse */}
      <form
        action={createServiceEntreprise}
        className="bg-white p-6 mt-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="nom" className="block text-gray-700 font-medium">
            Nom Service:
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
            Solde a Nouveau:
          </label>
          <input
            type="text"
            name="solde_a_nouveau"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-gray-700 font-medium"
          >
            montant_final:
          </label>
          <input
            type="text"
            name="montant_final"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Ajouter service de l'enpreprise</Button>
      </form>
    </div>
  );
}
