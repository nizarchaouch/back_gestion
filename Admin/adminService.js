const adminModel = require("./adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  ADMIN_NOT_FOUND: "Admin not found",
};

const addAdmin = async (req, res) => {
  const { nom, prenom, mail, tel, mdp } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await adminModel.findOne({ mail: mail });
  } catch (err) {
    console.log(err);
  }
  if (existingAdmin) {
    return res
      .status(400)
      .json({ message: "Admin already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(mdp);
  const admin = new adminModel({
    nom,
    prenom,
    mail,
    tel,
    role: 1,
    mdp,
    mdp: hashedPassword,
  });
  try {
    await admin.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: admin });
};
const login = async (req, res) => {
  data = req.body;
  mail = await adminModel.findOne({ mail: data.mail });
  if (mail == null) {
    payload = {
      role: 0,
    };
  } else {
    payload = {
      _id: mail._id,
      mail: mail.mail,
      nom: mail.nom,
      role: mail.role,
    };
  }
  if (!mail && payload.role == 1) {
    res.status(408).send("mail or password invalid!");
    console.log(payload.role);
  } else if (mail === null) {
    res.status(408).send("mail or password invalid");
  } else {
    validPass = bcrypt.compareSync(data.mdp, mail.mdp);
    if (!validPass) {
      res.status(401).send("mail or password invalid!");
    } else {
      payload = {
        _id: mail._id,
        mail: mail.mail,
        nom: mail.nom,
        role: mail.role,
      };
      token = jwt.sign(payload, "hello nizar");

      res
        .status(200)
        .send({ message: "Successfully Logged In", mytoken: token });
    }
  }
};
const showAdmins = async (req, res) => {
  try {
    const docs = await adminModel.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const adminToDelete = await adminModel.findById(req.params.id, "nom");
    if (!adminToDelete) {
      return res.status(404).json({ message: ERROR_MESSAGES.ADMIN_NOT_FOUND });
    }
    await adminModel.findByIdAndDelete(req.params.id);
    const docs = await adminModel.find({});
    res
      .status(200)
      .json({ message: `Admin ${adminToDelete.nom} est supprimé!`, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const updateAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedAdmin = await adminModel.findByIdAndUpdate(id, req.body);
      if (!updatedAdmin) {
        return res.status(404).json({ message: ERROR_MESSAGES.ADMIN_NOT_FOUND });
      }
      res.json(updatedAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

module.exports = { login, addAdmin, showAdmins, deleteAdmin, updateAdmin };
