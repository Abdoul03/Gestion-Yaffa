"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteCommision } from "@/actions/actions";
import Link from "next/link";

interface commissionActionsProps {
  commissionId: number;
}

const CommissionActions: React.FC<commissionActionsProps> = ({
  commissionId,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/commission/${commissionId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteCommision(commissionId)}>Supprimer</Button>
    </div>
  );
};

export default CommissionActions;
