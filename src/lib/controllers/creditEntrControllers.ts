const prisma = require('../config/database');

const createCreEnt = async (req, res) => {
  const { date, nomClient, prenomClient, motif, montant, montant_paye, montant_restant, solde } = req.body
  try {
    const creditEntrepise = await prisma.creditEntreprise.create({
      data: {
        date: new Date(date),
        nomClient,
        prenomClient,
        motif,
        montant: parseInt(montant, 10),
        montant_paye: parseInt(montant_paye, 10),
        montant_restant: parseInt(montant_restant, 10),
        solde: parseInt(solde, 10)
      }
    })

    res.status(201).json(creditEntrepise);
  } catch (error) {
    res.status(400).json({
      error: "Impossible de créer un credit d'entreprise",
      details: error.message
    });
  }
}

const getCreEnt = async (req, res) => {
  try {
    const allCreditEntrepises = await prisma.creditEntreprise.findMany()
    res.status(200).json(allCreditEntrepises)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation du credit d'entreprise.",
      details: error.message
    });
  }
}

const getCreEntById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const credit = await prisma.creditEntreprise.findUnique({ where: { id } })
    if (credit) {
      res.status(200).json(credit);
    } else {
      res.status(404).json({ error: 'credit entreprise non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation d'un credit d'entreprise.",
      details: error.message
    });
  }
}

const updateCreEnt = async (req, res) => {
  const id = parseInt(req.params.id);
  // Extraire les données du corps de la requête
  const { date, nomClient, prenomClient, motif, montant, montant_paye, montant_restant, solde } = req.body;
  try {
    const creditupdate = await prisma.creditEntreprise.update({
      where: { id },
      data: {
        date: new Date(date),
        nomClient,
        prenomClient,
        motif,
        montant: parseInt(montant, 10),
        montant_paye: parseInt(montant_paye, 10),
        montant_restant: parseInt(montant_restant, 10),
        solde: parseInt(solde, 10)
      }
    })
    res.status(200).json(creditupdate);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification du credit d'entreprise.",
      details: error.message
    });
  }
}

const deleteCreEnt = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const creditEntrepise = await prisma.creditEntreprise.delete({ where: { id } })
    res.status(200).json({ message: 'credit entreprise supprimé avec succès.', creditEntrepise })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'credit entreprise non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du credit d'entreprise.",
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

module.exports = { createCreEnt, getCreEnt, getCreEntById, updateCreEnt, deleteCreEnt }
