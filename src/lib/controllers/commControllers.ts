const prisma = require("../config/database")



const createCommission = async (req, res) => {
  const { date, mom_service, debit, montant, sold } = req.body
  try {
    const commision = await prisma.commissionDuMois.create({
      data: {
        date: new Date(date),
        mom_service,
        debit: parseInt(debit, 10),  // Conversion en entier
        montant: parseInt(montant, 10),  // Conversion en entier
        sold: parseInt(sold, 10)  // Conversion en entier
      }
    })
    res.status(201).json(commision);
  } catch (error) {
    res.status(400).json({
      error: 'Impossible de créer une commission',
      details: error.message
    });
  }
}

const getCommissions = async (req, res) => {
  try {
    const allcommission = await prisma.commissionDuMois.findMany()
    res.status(200).json(allcommission); // 200 pour OK
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des commisions.',
      details: error.message
    });
  }
}

const getCommissionById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const comm = await prisma.commissionDuMois.findUnique({ where: { id } })
    if (comm) {
      res.status(200).json(comm);
    } else {
      res.status(404).json({ error: 'commission non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des commisions.',
      details: error.message
    });
  }
}

const updateCommission = async (req, res) => {
  const id = parseInt(req.params.id);
  const { date, mom_service, debit, montant, sold } = req.body
  try {
    const commupdate = await prisma.commissionDuMois.update({
      where: { id }, data: {
        date: new Date(date),
        mom_service,
        debit: parseInt(debit, 10),  // Conversion en entier
        montant: parseInt(montant, 10),  // Conversion en entier
        sold: parseInt(sold, 10)  // Conversion en entier
      }
    })
    res.status(200).json(commupdate);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la modification de la commission.',
      details: error.message
    });
  }
}

const deleteCommission = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const delCommi = await prisma.commissionDuMois.delete({ where: { id } })
    res.status(200).json({ message: 'Commission supprimé avec succès.', delCommi })
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Commission non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du commision.',
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

module.exports = { createCommission, getCommissions, getCommissionById, updateCommission, deleteCommission }
