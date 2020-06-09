const mongoose= require("mongoose");

const URL_= process.env.MONGO_URL

const InitialiseMongo= async()=>{
    try{
        await mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology: true});
        console.log("connected to DB");
    } catch(error){
        console.log(error);
        throw error;
    }
}

module.exports= InitialiseMongo;