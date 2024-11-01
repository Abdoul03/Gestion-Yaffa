"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteTransInter } from "@/actions/actions";
import Link from "next/link";

interface transinterActionsProps {
  transInterId: number;
}

const TransInterActions: React.FC<transinterActionsProps> = ({
  transInterId,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/transInter/${transInterId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteTransInter(transInterId)}>Supprimer</Button>
    </div>
  );
};

export default TransInterActions;
