var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Stagiaire = new Schema({
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  projet: String,
  ecole: String,
  niveau: String,
  dureestage: String,
  dated: String,
  datef: String,
  typestage: String,
  encadrant: String,
  statut: Boolean,
});

module.exports = mongoose.model("stagiaire", Stagiaire);
