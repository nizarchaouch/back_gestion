var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Encadreur = new Schema({
  id:Number,
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  specialite: String,
  stagiaire: String,
  statut: Boolean,
});

module.exports = mongoose.model("encadreur", Encadreur);
