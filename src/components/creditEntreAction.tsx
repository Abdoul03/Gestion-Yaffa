"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteCreditEntreprise } from "@/actions/actions";
import Link from "next/link";

interface creditEntreActionsProps {
  creditEntrId: number;
}

const CreditEntrepriseActions: React.FC<creditEntreActionsProps> = ({
  creditEntrId,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/creditEntreprise/${creditEntrId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteCreditEntreprise(creditEntrId)}>
        Supprimer
      </Button>
    </div>
  );
};

export default CreditEntrepriseActions;
