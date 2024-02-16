const express = require("express");
const multer = require("multer");
const path = require("path");

var adminRoutes = require("./Admin/adminController");
var stagiRoutes = require("./Stagiaire/stagiController");
var encadRoutes = require("./Encadreur/encadController");
var offerRoutes = require("./Offer/offerController");
var demandeRoutes = require("./Deamande/demaController");
var assignerRoutes = require("./Assigner/assignerController");
var formRoutes = require("./Form/formController");

const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

app.use(express.json());

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/gestion");
    console.log("Database connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

database();
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use("/stagiaire", stagiRoutes);
app.use("/encadreur", encadRoutes);
app.use("/offer", offerRoutes);
app.use("/demande", demandeRoutes);
app.use("/form", formRoutes);
app.use("/assigner", assignerRoutes);
/////////////////
const storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  } 
});

const upload = multer({storage : storage})

app.post('/upload', upload.single('image'), async (req, res) => {
  // console.log(req);
  try {
    if(req.file) {
      const imagepath = req.file.path.replace(/\\/g, '/').replace('public','');

      res.json({
        message : 'DONE !',
        imagepath : imagepath.replace('src/', '')
      })
    }else {
      res.json({message : 'file didnt uploaded'})
    }
  }catch(err) {
    res.json({message : 'error', error : er})
  }
});

app.listen(8081, () => {
  console.log('server listing on PORT : ', 8081);
});
