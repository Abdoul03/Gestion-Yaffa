"use client"; // Marquer comme composant client

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteServiceEntreprise } from "@/actions/actions";
import Link from "next/link";

interface prepayeeActionsProps {
  serviceEntreId: number;
}

const ServiceEntrepriseActions: React.FC<prepayeeActionsProps> = ({
  serviceEntreId,
}) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/serviceEntreprise/${serviceEntreId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteServiceEntreprise(serviceEntreId)}>
        Supprimer
      </Button>
    </div>
  );
};

export default ServiceEntrepriseActions;
