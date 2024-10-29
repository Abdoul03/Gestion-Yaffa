import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-row bg-emerald-700">
      <div className="m-3 text-3xl text-amber-600 font-bold font-serif">
        <Link href={`/`}>YAFFA</Link>
      </div>
      <div className="">
        <ul className="flex flex-row gap-3 m-3">
          <li className="text-2xl text-lime-50">
            <Link href={`/caisse`}>Caisse</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/clientCanal`}>Client Canal</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/commission`}>Commission</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/CreditEntreprise`}>Credit Entreprise</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/prepayee`}>Prepayee</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/serviceEntreprise`}>Service</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/transInter`}>Transfert Internationnal</Link>
          </li>
          <li className="text-2xl text-lime-50">
            <Link href={`/uvAbonnement`}>Uv</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
