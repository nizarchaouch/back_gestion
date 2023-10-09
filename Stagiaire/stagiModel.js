var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Stagiaire = new Schema({
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  datenaissance: String,
  adrress: String,
  sexe: String,
  projet: String,
  ecole: String,
  specialite: String,
  niveau: String,
  dureestage: String,
  dated: String,
  datef: String,
  typestage: String,
  encadrant: String,
  statut: Boolean,
  role: Number,
});

module.exports = mongoose.model("stagiaire", Stagiaire);
