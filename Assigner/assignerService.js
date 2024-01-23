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

  //return res.status(201).json({ message: assg });
};

module.exports = { addAssg };
