var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Offer = new Schema({
  id:Number,
  titre: String,
  description: String,
});

module.exports = mongoose.model("offer", Offer);
