var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Stagiaire = new Schema({
  nom: String,
  prenom: String,
  mail: String,
  tel: String,
  datenaissance: Date,
  adrress: String,
  sexe: String,
  projet: String,
  ecole: String,
  specialite:String,
  niveau: String,
  dureestage: String,
  dated: Date,
  datef: Date,
  typestage: String,
  encadrant: String,
  statut: Boolean,
});

module.exports = mongoose.model("stagiaire", Stagiaire);
