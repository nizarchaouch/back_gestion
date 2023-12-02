var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Admin=new Schema({
    nom:String,
    prenom:String,
    mail:String,
    tel:String,
    mdp:String,
    role:String,
    token:{
        type:String,
    },
    
    resetToken:{type:String,
    }

})

module.exports=mongoose.model("admin",Admin)


