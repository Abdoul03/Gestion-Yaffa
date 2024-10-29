import { prisma } from "@/lib/db";
import React from "react";
// import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// export default async function Page() {
//   const caisses = await prisma.caisse.findMany();

//   return (
//     <>
//       <h2 className="font-bold text-green-500 m-5">Caisse entreprise</h2>
//       <ul>
//         {caisses.map((caisse) => (
//           <li key={caisse.id}>
//             <Link href={`/caisse/${caisse.id}`}>{caisse.service}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

export default async function Page() {
  const caisses = await prisma.caisse.findMany();
  return (
    <Table>
      <TableCaption>La Caisse.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Services</TableHead>
          <TableHead>Stock Initial</TableHead>
          <TableHead>Stock Final</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead className="text-right">Solde</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {caisses.map((caisse) => (
          <TableRow key={caisse.id}>
            <TableCell className="font-medium">
              {caisse.date.toLocaleDateString()}
            </TableCell>
            <TableCell>{caisse.service}</TableCell>
            <TableCell>{caisse.stock_initial}</TableCell>
            <TableCell>{caisse.stock_final}</TableCell>
            <TableCell>{caisse.montant_total}</TableCell>
            <TableCell className="text-right">{caisse.solde}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
