import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../db";

export const addCaisse = async (req: NextApiRequest, res:NextApiResponse) => {
  const { date, service, stock_initial, stock_final, montant_total, solde } = req.body
  try {
    const caisse = await prisma.caisse.create({
      data: {
        date: new Date(date),
        service,
        stock_initial: parseInt(stock_initial, 10),
        stock_final: parseInt(stock_final, 10),
        montant_total: parseInt(montant_total, 10),
        solde: parseInt(solde, 10)
      }
    })
    res.status(201).json(caisse);
  } catch (error) {
    res.status(400).json({
      error: 'Impossible de créer le client Canal',
      details: error.message
    });
  }
}

export const getCaisse = async (req: NextApiRequest, res:NextApiResponse) => {
  try {
    const caisse = await prisma.caisse.findMany()
    res.status(200).json(caisse)
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des caisses.',
      details: error.message
    });
  }
}

export const getCaisseById = async (req: NextApiRequest, res:NextApiResponse) => {
  const id = parseInt(req.params.id)
  try {
    const caisse = await prisma.caisse.findUnique({ where: { id } })
    if (caisse) {
      res.status(200).json(caisse)
    } else {
      res.status(404).json({ error: 'Caisse non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération du ciasse.',
      details: errorMonitor
    });
  }
}

export const updateCaisse = async (req: NextApiRequest, res:NextApiResponse) => {
  const id = parseInt(req..id)
  const { date, service, stock_initial, stock_final, montant_total, solde } = req.body
  try {
    const caisse = await prisma.caisse.update({
      where: { id },
      data: {
        date: new Date(date),
        service,
        stock_initial: parseInt(stock_initial, 10),
        stock_final: parseInt(stock_final, 10),
        montant_total: parseInt(montant_total, 10),
        solde: parseInt(solde, 10)
      }
    })
    res.status(200).json(caisse);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la modification de la caisse.',
      details: error.message
    });
  }
}

export const deleteCaisse = async (req: NextApiRequest, res:NextApiResponse) => {
  const id = parseInt(req.query.id)
  try {
    const caiisse = await prisma.caisse.delete({ where: { id } })
    res.status(200).json({ message: 'Caisse supprimé avec succès.', caiisse })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Caisse non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du caisse.',
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

