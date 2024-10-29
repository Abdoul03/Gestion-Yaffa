const prisma = require('../config/database');


const addUvAbon = async (req, res) => {
  const { date, produit, montant } = req.body
  try {
    const uv = await prisma.uvAbonnement.create({
      data: {
        date: new Date(date),
        produit,
        montant: parseInt(montant)
      }
    })
    res.status(201).json(uv)
  } catch (error) {
    res.status(400).json({
      error: "Impossible d'ajouter un nouveau UV",
      details: error.message
    });
  }
}

const getUvAbon = async (req, res) => {
  try {
    const uv = await prisma.uvAbonnement.findMany()
    res.status(200).json(uv)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation des uv.",
      details: error.message
    });
  }
}

const getUvAbonById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const uv = await prisma.uvAbonnement.findUnique({ where: { id } })
    if (uv) {
      res.status(200).json(uv)
    } else {
      res.status(404).json({ error: 'service non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation du uv.",
      details: error.message
    });
  }
}

const updateUvAbon = async (req, res) => {
  const id = parseInt(req.params.id)
  const { date, produit, montant } = req.body
  try {
    const uv = await prisma.uvAbonnement.update({
      where: { id },
      data: {
        date: new Date(date),
        produit,
        montant: parseInt(montant)
      }
    })
    res.status(200).json(uv)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification du uv .",
      details: error.message
    });
  }
}

const deleteUvAbon = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const uv = await prisma.uvAbonnement.delete({ where: { id } })
    res.status(200).json({ message: 'service supprimé avec succès.', uv })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'uv non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du uv.",
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}



module.exports = { getUvAbon, getUvAbonById, updateUvAbon, deleteUvAbon, addUvAbon }
