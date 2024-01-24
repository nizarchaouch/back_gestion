const assgineModel = require("./assignerModel");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  ASSIGNE_NOT_FOUND: "Assignment not found",
};

const addAssg = async (req, res) => {
  const { idStag, idEencad } = req.body;

  const assg = new assgineModel({
    idStag,
    idEencad,
  });
  try {
    await assg.save();
    return res
      .status(201)
      .json({ message: "Assignment created successfully", assg });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const showAssg = async (req, res) => {
  try {
    // const id = req.params.id;
    const docs = await assgineModel.find(/* { idStag: id } */);
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteAssg = async (req, res) => {
  try {
    const assgToDelete = await assgineModel.findById(req.params.id);
    if (!assgToDelete) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ASSIGNE_NOT_FOUND });
    }
    await assgineModel.findByIdAndDelete(req.params.id);
    const docs = await assgineModel.find({});
    res
      .status(200)
      .json({ message: `Assignment est supprimé!`, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addAssg, showAssg, deleteAssg };
