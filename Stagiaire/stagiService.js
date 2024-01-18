const StagiModel = require("./stagiModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  STAGIAIRE_NOT_FOUND: "Stagiaire not found",
};

const addStagi = async (req, res) => {
  const {
    nom,
    prenom,
    mail,
    tel,
    datenaissance,
    adrress,
    sexe,
    projet,
    ecole,
    specialite,
    niveau,
    dureestage,
    dated,
    datef,
    typestage,
    encadrant,
  } = req.body;

  let existingStagi;
  try {
    existingStagi = await StagiModel.findOne({ mail: mail });
  } catch (err) {
    console.log(err);
  }
  if (existingStagi) {
    return res.status(400).json({ message: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
  const stagiaire = new StagiModel({
    nom,
    prenom,
    mail,
    tel,
    datenaissance,
    adrress,
    sexe,
    projet,
    ecole,
    specialite,
    niveau,
    dureestage,
    dated,
    datef,
    typestage,
    encadrant,
    statut: true,
    role: 1,
  });

  try {
    await stagiaire.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: stagiaire });
};
const showStagi = async (req, res) => {
  try {
    const docs = await StagiModel.find({ role: 1 });
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const showStagiId = async (req, res) => {
  try {
    const id = req.params.id;
    const docs = await StagiModel.findById(id, req.body);
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
const statut = async (req, res) => {
  try {
    const id = req.params.id;
    const stagiaire = await StagiModel.findById(id);
    if (!stagiaire) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ENCADREUR_NOT_FOUND });
    }
    stagiaire.statut = !stagiaire.statut;

    await stagiaire.save();

    res.json(stagiaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  addStagi,
  showStagi,
  showStagiId,
  deleteStagi,
  updateStagi,
  statut,
};
