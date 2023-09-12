const OfferModel = require("./offerModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  OFFER_NOT_FOUND: "Offer not found",
};

const addOffer = async (req, res) => {
  const { titre, description } = req.body;

  let existingOffer;
  try {
    existingOffer = await OfferModel.findOne({ titre: titre });
  } catch (err) {
    console.log(err);
  }
  if (existingOffer) {
    return res.status(400).json({ message: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
  const offer = new OfferModel({
    titre,
    description,
  });

  try {
    await offer.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: offer });
};
const showOffer = async (req, res) => {
  try {
    const docs = await OfferModel.find({});
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const deleteOffer = async (req, res) => {
  try {
    const offerToDelete = await OfferModel.findById(req.params.id, "titre");
    if (!offerToDelete) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.OFFER_NOT_FOUND });
    }
    await OfferModel.findByIdAndDelete(req.params.id);
    const docs = await OfferModel.find({});
    res
      .status(200)
      .json({ message: `Offer ${offerToDelete.titre} est supprimé!`, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const updateOffer = async (req, res) => {
  try {
    const id = req.params.id;
    const updateOffer = await OfferModel.findByIdAndUpdate(id, req.body);
    if (!updateOffer) {
      return res.status(404).json({ message: ERROR_MESSAGES.OFFER_NOT_FOUND});
    }
    res.json(updateOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addOffer, showOffer, deleteOffer, updateOffer };
