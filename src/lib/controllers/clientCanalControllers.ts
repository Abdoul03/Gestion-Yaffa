const prisma = require('../config/database');


//Ajouter un nouveau client canal +
const createClientCanal = async (req, res) => {
  const { nom, prenom, telephone, numAbonne, finAbonn } = req.body;
  try {
    const clientCanal = await prisma.clientCanal.create({
      data: {
        nom,
        prenom,
        telephone,
        numAbonne: BigInt(numAbonne),
        // Convertir finAbonn en objet Date si nécessaire
        finAbonn: new Date(finAbonn),
      },
    });
    res.status(201).json(clientCanal);
  } catch (error) {
    res.status(400).json({
      error: 'Impossible de créer le client Canal',
      details: error.message
    });
  }
};

// Récupérer tous les clients canal+ (read)
const getClientCanal = async (req, res) => {
  try {
    const clientCanals = await prisma.clientCanal.findMany();

    // Parcourir la liste et convertir chaque numAbonne (BigInt) en string
    const clientsFormatted = clientCanals.map(client => ({
      ...client,
      numAbonne: client.numAbonne.toString() // Convertir BigInt en string
    }));

    res.status(200).json(clientsFormatted); // 200 pour OK 
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des clients canal +.',
      details: error.message
    });
  }
};

// Récupérer un client canal+ par son ID (read)
const getClientCanalById = async (req, res) => {
  const clientId = parseInt(req.params.id);
  try {
    const client = await prisma.clientCanal.findUnique({ where: { id: clientId } });
    if (client) {
      const clientFormatted = {
        ...client,
        numAbonne: client.numAbonne.toString() // Convertir BigInt en string
      };
      res.status(200).json(clientFormatted); // Retourner le client s'il est trouvé
    } else {
      res.status(404).json({ error: 'Client Canal+ non trouvé.' }); // Si le client n'est pas trouvé
    }
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération du client canal +.',
      details: error.message
    });
  }
};

// Mettre a jour un client canal+ (update)
const updateAClientCanal = async (req, res) => {
  const clientId = parseInt(req.params.id);
  try {
    const { nom, prenom, telephone, numAbonne, finAbonn } = req.body;
    // Vérifiez que tous les champs nécessaires sont définis
    if (!nom || !prenom || !telephone || !numAbonne || !finAbonn) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Assurez-vous que finAbonn est au format ISO 8601
    const formattedFinAbonn = new Date(finAbonn);
    if (isNaN(formattedFinAbonn.getTime())) {
      return res.status(400).json({ error: "finAbonn doit être une date valide." });
    }

    const client = await prisma.clientCanal.update({
      where: { id: clientId },
      data: {
        nom,
        prenom,
        telephone,
        numAbonne: BigInt(numAbonne),
        // Convertir finAbonn en objet Date si nécessaire
        finAbonn: formattedFinAbonn.toISOString() // Convertir au format ISO
      },
    });
    // Formater les données du client
    const clientFormatted = {
      ...client,
      numAbonne: client.numAbonne.toString() // Convertir BigInt en string
    };
    res.status(200).json(clientFormatted);
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur est survenue lors de la modification du client canal +.',
      details: error.message
    });
  }
}

// supprimer un client canal+ (delete)
const deleteClientCanal = async (req, res) => {
  const clientId = parseInt(req.params.id);
  try {
    const client = await prisma.clientCanal.delete({ where: { id: clientId } })
    const clientFormatted = {
      ...client,
      numAbonne: client.numAbonne.toString() // Convertir BigInt en string
    };
    // Retourner une réponse de succès après la suppression
    res.status(200).json({ message: 'Client Canal+ supprimé avec succès.', clientFormatted });
  } catch (error) {
    if (error.code === 'P2025') {
      // Si le client n'est pas trouvé
      res.status(404).json({ error: 'Client Canal+ non trouvé.' });
    } else {
      // Pour les autres erreurs
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du client canal +.',
        details: error.message // Inclure le message d'erreur
      });
    }
  }
}

module.exports = { getClientCanal, getClientCanalById, createClientCanal, updateAClientCanal, deleteClientCanal };
