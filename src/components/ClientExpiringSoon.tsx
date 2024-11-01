// components/ClientExpiringSoon.tsx
import React from "react";

interface Client {
  id: number;
  nom: string;
  prenom: string;
  telephone?: string;
  numAbonne?: bigint;
  finAbonn: Date;
}

interface ClientExpiringSoonProps {
  clients: Client[];
}

const ClientExpiringSoon: React.FC<ClientExpiringSoonProps> = ({ clients }) => {
  return (
    <div>
      <h2>Clients dont l'abonnement expire dans deux jours</h2>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.prenom} {client.nom} - Fin d'abonnement :{" "}
              {new Date(client.finAbonn).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun client à afficher.</p>
      )}
    </div>
  );
};

export default ClientExpiringSoon;
