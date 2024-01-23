const assgineModel = require("./assignerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  ASSIGNE_NOT_FOUND: "Assgine not found",
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
    const id = req.params.id;
    const docs = await assgineModel.find({ idStag: id });
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addAssg, showAssg };
