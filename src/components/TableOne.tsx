"use client";

import { getClientsExpiringSoon } from "@/actions/actions";
import { useState, useEffect } from "react";

interface Client {
  id: number;
  nom: string;
  prenom: string;
  telephone: string | null;
  numAbonne: string;
  finAbonn: Date;
}

export default function TableOne() {
  const [clients_canal, setClientsCanal] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientsExpiringSoon();
        setClientsCanal(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        setError(
          "Erreur lors de la récupération des clients. Veuillez réessayer."
        );
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="m-5 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Fin Abonnement dans 2 jours
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Nom</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Prenom
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Telephone
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Numero D'bonnement
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date de Fin D'abonnement
            </h5>
          </div>
        </div>

        {clients_canal.map((client) => (
          <div
            className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"
            key={client.id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {client.nom}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{client.prenom}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-green-300">{client.telephone}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{client.numAbonne}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-sky-300">
                {new Date(client.finAbonn).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
