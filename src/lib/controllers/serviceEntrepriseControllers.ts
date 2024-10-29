const prisma = require('../config/database');


const createServEntre = async (req, res) => {
  const { date, mom_service, solde_a_nouveau, montant_final, total } = req.body
  try {
    const serviceEntreprise = await prisma.serviceEntreprise.create({
      data: {
        date: new Date(date),
        mom_service,
        solde_a_nouveau: parseInt(solde_a_nouveau, 10),
        montant_final: parseInt(montant_final, 10),
        total: parseInt(total, 10)
      }
    })
    res.status(201).json(serviceEntreprise)
  } catch (error) {
    res.status(400).json({
      error: "Impossible de créer un nouveau service entreprise",
      details: error.message
    });
  }
}

const getServEntr = async (req, res) => {
  try {
    const allServices = await prisma.serviceEntreprise.findMany()
    res.status(200).json(allServices)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation des services d'entreprise.",
      details: error.message
    });
  }
}

const getServEntrById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const service = await prisma.serviceEntreprise.findUnique({ where: { id } })
    if (service) {
      res.status(200).json(service)
    } else {
      res.status(404).json({ error: 'service non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation des services.",
      details: error.message
    });
  }
}

const updateServEntr = async (req, res) => {
  const id = parseInt(req.params.id)
  const { date, mom_service, solde_a_nouveau, montant_final, total } = req.body
  try {
    const service = await prisma.serviceEntreprise.update({
      where: { id },
      data: {
        date: new Date(date),
        mom_service,
        solde_a_nouveau: parseInt(solde_a_nouveau, 10),
        montant_final: parseInt(montant_final, 10),
        total: parseInt(total, 10)
      }
    })
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification du service .",
      details: error.message
    });
  }
}

const deleteServEntr = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const serviceDelete = await prisma.serviceEntreprise.delete({ where: { id } })
    res.status(200).json({ message: 'service supprimé avec succès.', serviceDelete })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'service non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du service.",
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

module.exports = { createServEntre, getServEntr, getServEntrById, updateServEntr, deleteServEntr }
