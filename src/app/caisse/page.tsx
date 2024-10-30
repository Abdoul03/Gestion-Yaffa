"use client";

import React, { useState } from "react";
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
import { deleteCaisse, editeCaisse } from "@/actions/actions";
import { prisma } from "@/lib/db";
import { $Enums } from "@prisma/client";

interface FormData {
  service: string;
  stock_initial: number;
  stock_final: number | null;
  montant_total: number | null;
}

// Fonction pour récupérer les données côté serveur
export async function getServerSideProps() {
  const caisses = await prisma.caisse.findMany();
  return { props: { caisses } };
}

export default function Page({ caisses }) {
  // Calcul du total des montants
  const totalMontant = caisses.reduce(
    (sum, caisse) => sum + (caisse.montant_total ?? 0),
    0
  );

  // État pour stocker les données du formulaire d'édition
  const [formData, setFormData] = useState<FormData>({
    montant_total: 0,
    service: "",
    stock_initial: 0,
    stock_final: null,
  });

  // Fonction de gestion de la modification
  const handleEditClick = (caisse: {
    id: number;
    date: Date;
    service: $Enums.nomService;
    stock_initial: number;
    stock_final: number | null;
    montant_total: number | null;
  }) => {
    // Remplir les données actuelles dans formData pour que l'utilisateur puisse les modifier
    setFormData({
      service: caisse.service,
      stock_initial: caisse.stock_initial,
      stock_final: caisse.stock_final,
      montant_total: caisse.montant_total,
    });
  };

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
                  {new Date(caisse.date).toLocaleDateString()}
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
              <TableCell className="p-4 text-gray-700 flex gap-2">
                <Button onClick={() => deleteCaisse(caisse.id)}>
                  Supprimer
                </Button>
                <Button onClick={() => handleEditClick(caisse)}>
                  Modifier
                </Button>
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

      {/* Formulaire de modification */}
      <div className="p-4 bg-white shadow-md rounded-lg mt-4">
        <h2 className="text-lg font-semibold mb-4">Modifier la Caisse</h2>
        <label className="block text-gray-700">Service:</label>
        <input
          type="text"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <label className="block text-gray-700">Montant Total:</label>
        <input
          type="number"
          value={formData.montant_total || ""}
          onChange={(e) =>
            setFormData({ ...formData, montant_total: Number(e.target.value) })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <label className="block text-gray-700">Stock Initial:</label>
        <input
          type="text"
          value={formData.stock_initial}
          onChange={(e) =>
            setFormData({ ...formData, stock_initial: Number(e.target.value) })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <label className="block text-gray-700">Stock final:</label>
        <input
          type="text"
          value={formData.stock_final || ""}
          onChange={(e) =>
            setFormData({ ...formData, stock_final: Number(e.target.value) })
          }
          className="mb-4 p-2 border rounded w-full"
        />
        <Button onClick={() => editeCaisse(formData, formData.id)}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
