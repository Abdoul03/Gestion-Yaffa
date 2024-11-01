import React from "react";
import { Button } from "@/components/ui/button";
import { deleteUvAbonne } from "@/actions/actions";
import Link from "next/link";

interface uvAbonneActionsProps {
  UvAbonneId: number;
}

const UvAbonneActions: React.FC<uvAbonneActionsProps> = ({ UvAbonneId }) => {
  return (
    <div className="flex flex-row gap-3">
      <Button>
        <Link href={`/uvAbonnement/${UvAbonneId}`}>Modifier</Link>
      </Button>
      <Button onClick={() => deleteUvAbonne(UvAbonneId)}>Supprimer</Button>
    </div>
  );
};

export default UvAbonneActions;
