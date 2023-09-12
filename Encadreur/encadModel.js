var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Encadreur = new Schema({
  id:Int32Array,
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  specialite: String,
  Stagiaire: String,
  statut: Boolean,
});

module.exports = mongoose.model("encadreur", Encadreur);
