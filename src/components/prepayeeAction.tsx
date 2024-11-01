"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deletePrepayee } from "@/actions/actions";
import Link from "next/link";

interface prepayeeActionsProps {
  prepayeeId: number;
}

const PrepayeeActions: React.FC<prepayeeActionsProps> = ({ prepayeeId }) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/prepayee/${prepayeeId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deletePrepayee(prepayeeId)}>Supprimer</Button>
    </div>
  );
};

export default PrepayeeActions;
