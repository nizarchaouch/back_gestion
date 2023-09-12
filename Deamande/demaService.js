const StagiModel = require("../Stagiaire/stagiModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  DEMANDE_NOT_FOUND: "Demande not found",
};

const addDemande = async (req, res) => {
  const {
    nom,
    prenom,
    datenaissance,
    adrress,
    sexe,
    tel,
    mail,
    dureestage,
    dated,
    datef,
    ecole,
    niveau,
    specialite,
    projet,
    encadrant,
    typestage,
  } = req.body;

  let existingDemande;
  try {
    existingDemande = await StagiModel.findOne({ mail: mail });
  } catch (err) {
    console.log(err);
  }
  if (existingDemande) {
    return res.status(400).json({ message: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
  const demande = new StagiModel({
    nom,
    prenom,
    datenaissance,
    adrress,
    sexe,
    tel,
    mail,
    dureestage,
    dated,
    datef,
    ecole,
    niveau,
    specialite,
    projet,
    encadrant,
    typestage,
    statut: false,
    role: 0,
  });

  try {
    await demande.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: demande });
};
const showStagi = async (req, res) => {
  try {
    const docs = await StagiModel.find({ role: 0 });
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const deleteStagi = async (req, res) => {
  try {
    const stagiToDelete = await StagiModel.findById(req.params.id, "nom");
    if (!stagiToDelete) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.STAGIAIRE_NOT_FOUND });
    }
    await StagiModel.findByIdAndDelete(req.params.id);
    const docs = await StagiModel.find({});
    res
      .status(200)
      .json({ message: `Stagiaire ${stagiToDelete.nom} est supprimé!`, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const updateStagi = async (req, res) => {
  try {
    const id = req.params.id;
    const updateStagi = await StagiModel.findByIdAndUpdate(id, req.body);
    if (!updateStagi) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.STAGIAIRE_NOT_FOUND });
    }
    res.json(updateStagi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addDemande, showStagi, deleteStagi, updateStagi };
