const mongoose= require("mongoose");

const URL= "mongodb+srv://Abhinav:11902015@repairproducts-rtxbh.mongodb.net/repair?retryWrites=true&w=majority"

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