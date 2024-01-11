const express = require("express");

var adminRoutes = require("./Admin/adminController");
var stagiRoutes = require("./Stagiaire/stagiController");
var encadRoutes = require("./Encadreur/encadController");
var offerRoutes = require("./Offer/offerController");
var demandeRoutes = require("./Deamande/demaController");
var assignerRoutes = require("./Assigner/assignerController");
var formRoutes = require("./Form/formController");


const app = express();
const mongoose = require("mongoose");

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

app.use(express.json());

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb://127.0.0.1:27017/gestion"
    );
    console.log("Database connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

database();
app.use(cors({
  origin: ["http://localhost:8080"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/admin", adminRoutes);
app.use("/stagiaire", stagiRoutes);
app.use("/encadreur", encadRoutes);
app.use("/offer", offerRoutes);
app.use("/demande", demandeRoutes);
app.use("/form", formRoutes);
// app.use("/assigner", assignerRoutes);

app.listen(8081);