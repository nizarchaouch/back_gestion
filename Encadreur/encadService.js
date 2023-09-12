const EncadModel = require("./encadModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  ENCADREUR_NOT_FOUND: "Encadreur not found",
};

const addEncad = async (req, res) => {
  const { nom, prenom, mail, tel, specialite, Stagiaire } = req.body;

  let existingEncad;
  try {
    existingEncad = await EncadModel.findOne({ mail: mail });
  } catch (err) {
    console.log(err);
  }
  if (existingEncad) {
    return res.status(400).json({ message: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
  const encadreur = new EncadModel({
    nom,
    prenom,
    mail,
    tel,
    specialite,
    Stagiaire,
    statut: true,
  });

  try {
    await encadreur.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: encadreur });
};
const showEncad = async (req, res) => {
  try {
    const docs = await EncadModel.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const deleteEncad = async (req, res) => {
  try {
    const encadToDelete = await EncadModel.findById(req.params.id, "nom");
    if (!encadToDelete) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ENCADREUR_NOT_FOUND });
    }
    await EncadModel.findByIdAndDelete(req.params.id);
    const docs = await EncadModel.find({});
    res
      .status(200)
      .json({ message: `Encadreur ${stagiToDelete.nom} est supprimé!`, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const updateEncad = async (req, res) => {
  try {
    const id = req.params.id;
    const updateEncad = await EncadModel.findByIdAndUpdate(id, req.body);
    if (!updateEncad) {
      return res.status(404).json({ message: ERROR_MESSAGES.ENCADREUR_NOT_FOUND });
    }
    res.json(updateEncad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addEncad, showEncad, deleteEncad, updateEncad };
