import React from "react";
import { prisma } from "@/lib/db";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params; // Attente de la promesse `params`
  const id = parseInt(resolvedParams.id, 10); // Conversion en entier
  const caisse = await prisma.caisse.findUnique({
    where: { id },
  });

  if (!caisse) {
    return <div>Caisse non trouvé</div>;
  }

  return (
    <>
      <h2 className="font-bold text-green-500 m-5">{caisse.service}</h2>
      {caisse ? (
        <ul>
          <li>Date:{caisse.date.toLocaleDateString()}</li>
          <li>Stock_initial : {caisse.stock_initial}</li>
          <li>Stock_final : {caisse.stock_final}</li>
          <li>solde : {caisse.solde}</li>
        </ul>
      ) : (
        "Caisse non trouvée"
      )}
    </>
  );
}
