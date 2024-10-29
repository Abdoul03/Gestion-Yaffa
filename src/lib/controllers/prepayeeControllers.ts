const prisma = require('../config/database');


const createPrepayee = async (req, res) => {
  const { date, nom_client, montant_initial, montant_depense, montant_restant } = req.body
  try {
    const prepayee = await prisma.prepayee.create({
      data: {
        date: new Date(date),
        nom_client,
        montant_initial: parseInt(montant_initial, 10),
        montant_depense: parseInt(montant_depense, 10),
        montant_restant: parseInt(montant_restant, 10)
      }
    })
    res.status(201).json(prepayee)
  } catch (error) {
    res.status(400).json({
      error: "Impossible de créer un prepayee",
      details: error.message
    });
  }
}

const getPrepayee = async (req, res) => {
  try {
    const prepayee = await prisma.prepayee.findMany()
    res.status(200).json(prepayee)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation des prepayee.",
      details: error.message
    });
  }
}

const getPrepayeeById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const prepayee = await prisma.prepayee.findUnique({ where: { id } })
    if (prepayee) {
      res.status(200).json(prepayee);
    } else {
      res.status(404).json({ error: 'prepayee non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation du prepayee.",
      details: error.message
    });
  }
}

const updatePrepayee = async (req, res) => {
  const id = parseInt(req.params.id)
  const { date, nom_client, montant_initial, montant_depense, montant_restant } = req.body
  try {
    const prepaupdate = await prisma.prepayee.update({
      where: { id },
      data: {
        date: new Date(date),
        nom_client,
        montant_initial: parseInt(montant_initial, 10),
        montant_depense: parseInt(montant_depense, 10),
        montant_restant: parseInt(montant_restant, 10)
      }
    })
    res.status(200).json(prepaupdate);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification du prepayee.",
      details: error.message
    });
  }
}

const deletePrepayee = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const deletePrep = await prisma.prepayee.delete({ where: { id } })
    res.status(200).json({ message: 'prepayee supprimé avec succès.', deletePrep })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'prepayee non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du prepayee.",
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

module.exports = { createPrepayee, getPrepayee, getPrepayeeById, updatePrepayee, deletePrepayee }
