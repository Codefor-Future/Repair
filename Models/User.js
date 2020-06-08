const mongoose= require("mongoose");

const UserData= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    posts:[]

})

module.exports= mongoose.model("User", UserData);
