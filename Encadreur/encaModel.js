var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Stagiaire = new Schema({
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  specialite: String,
  Stagiaire: String,
  statut: Boolean,
});

module.exports = mongoose.model("stagiaire", Stagiaire);
