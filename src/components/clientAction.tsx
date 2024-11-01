"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteClientCanal } from "@/actions/actions";
import Link from "next/link";

interface clilentCanalActionsProps {
  clientCanalId: number;
}

const ClientCanalActions: React.FC<clilentCanalActionsProps> = ({
  clientCanalId,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/clientCanal/${clientCanalId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteClientCanal(clientCanalId)}>
        Supprimer
      </Button>
    </div>
  );
};

export default ClientCanalActions;
