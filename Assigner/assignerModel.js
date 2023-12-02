var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Assigner = new Schema({
  idStag:Object,
  idEencad:Object,
});

module.exports = mongoose.model("assigner", Assigner);