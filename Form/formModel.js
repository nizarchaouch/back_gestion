var mongoose = require("mongoose");
var schema = mongoose.Schema;

var Form = new schema({
    selectedValue: String,
    inputQuestion: String,
    require: Boolean,
});
module.exports = mongoose.model("form", Form);