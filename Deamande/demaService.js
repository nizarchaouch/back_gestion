const StagiModel = require("../Stagiaire/stagiModel");
const nodemailer = require("nodemailer");
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
const showDemande = async (req, res) => {
  try {
    const docs = await StagiModel.find({ role: 0 });
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const accept = async (req, res) => {
  try {
    const id = req.params.id;
    const acepterDema = await StagiModel.findByIdAndUpdate(id, { role: 1 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nizar.chaouch@polytechnicien.tn",
        pass: "rpft gvgn crpp rtpa",
      },
    });

    const mailOptions = {
      from: "nizar.chaouch@polytechnicien.tn",
      to: acepterDema.mail,
      subject: "Réponse à une demande de stage",
      html: `
      <p>SwConsulting accepte votre demande de stage</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });

    if (!acepterDema) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.DEMANDE_NOT_FOUND });
    }
    res.json(acepterDema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const refuse = async (req, res) => {
  try {
    const demandeToDelete = await StagiModel.findById(req.params.id, "nom");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nizar.chaouch@polytechnicien.tn",
        pass: "rpft gvgn crpp rtpa",
      },
    });

    const mailOptions = {
      from: "nizar.chaouch@polytechnicien.tn",
      to: "chaouchnizar1@gmail.com",
      subject: "Réponse à une demande de stage",
      html: `
      <p>SwConsulting a rejeté votre demande de stage</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });

    if (!demandeToDelete) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.DEMANDE_NOT_FOUND });
    }
    await StagiModel.findByIdAndDelete(req.params.id);
    const docs = await StagiModel.find({});
    res.status(200).json({
      message: `La demande de ${demandeToDelete.nom} a été rejetée!`,
      docs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
module.exports = { addDemande, showDemande, accept, refuse };
