const mongoose= require('mongoose');
const AdminSchema=mongoose.Schema({
    name:String,
    password:{
        require:true,
        type:String
    },
    adminKey:{
        require:true,
        type:String
    }

})

const Admin= mongoose.model("Admin", AdminSchema)
module.exports= Admin