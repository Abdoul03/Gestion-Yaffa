// CaisseActions.tsx
"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteCaisse } from "@/actions/actions";
import Link from "next/link";

interface CaisseActionsProps {
  caisseId: number;
}

const CaisseActions: React.FC<CaisseActionsProps> = ({ caisseId }) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/caisse/${caisseId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteCaisse(caisseId)}>Supprimer</Button>
    </div>
  );
};

export default CaisseActions;
