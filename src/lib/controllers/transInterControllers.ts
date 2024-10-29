const prisma = require('../config/database');


const addTransInter = async (req, res) => {
  const {
    montant_initial,
    nom_service, montant_trans, montant_recus, date_debut, date_fin, soldes, Decouvert, credit, debit_caisse, debit_BNDA
  } = req.body
  try {
    const transInterna = await prisma.transInternation.create({
      data: {
        montant_initial: parseInt(montant_initial, 10),
        nom_service,
        montant_trans: parseInt(montant_trans, 10),
        montant_recus: parseInt(montant_recus, 10),
        date_debut: new Date(date_debut),
        date_fin: new Date(date_fin),
        soldes: parseInt(soldes, 10),
        Decouvert: parseInt(Decouvert, 10),
        credit: parseInt(credit, 10),
        debit_caisse: parseInt(debit_caisse, 10),
        debit_BNDA: parseInt(debit_BNDA, 10),
      }
    })
    res.status(201).json(transInterna)
  } catch (error) {
    res.status(400).json({
      error: "Impossible d'ajouter un nouveau transfert internationnal",
      details: error.message
    });
  }
}

const getTransInter = async (req, res) => {
  try {
    const transInter = await prisma.transInternation.findMany()
    res.status(200).json(transInter)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation des transfert Internationnal.",
      details: error.message
    });
  }
}

const getTransInterById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const transfert = await prisma.transInternation.findUnique({ where: { id } })
    if (transfert) {
      res.status(200).json(transfert)
    } else {
      res.status(404).json({ error: 'service non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recuperation du trnasfert internationnal.",
      details: error.message
    });
  }
}

const updateTransInter = async (req, res) => {
  const id = parseInt(req.params.id)
  const {
    montant_initial,
    nom_service, montant_trans, montant_recus, date_debut, date_fin, soldes, Decouvert, credit, debit_caisse, debit_BNDA
  } = req.body
  try {
    const updateTrans = await prisma.transInternation.update({
      where: { id },
      data: {
        montant_initial: parseInt(montant_initial, 10),
        nom_service,
        montant_trans: parseInt(montant_trans, 10),
        montant_recus: parseInt(montant_recus, 10),
        date_debut: new Date(date_debut),
        date_fin: new Date(date_fin),
        soldes: parseInt(soldes, 10),
        Decouvert: parseInt(Decouvert, 10),
        credit: parseInt(credit, 10),
        debit_caisse: parseInt(debit_caisse, 10),
        debit_BNDA: parseInt(debit_BNDA, 10),
      }
    })
    res.status(200).json(updateTrans)
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification du trnasfert internationnal .",
      details: error.message
    });
  }
}

const deleteTransInter = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const transDelete = await prisma.transInternation.delete({ where: { id } })
    res.status(200).json({ message: 'service supprimé avec succès.', transDelete })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'transfert internationnal non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du transfert internationnal.",
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}


module.exports = { getTransInter, getTransInterById, updateTransInter, deleteTransInter, addTransInter }

