
const express= require("express")
const bodyParser= require("body-parser")
const InitMongo= require("./config/db")
const user= require("./Routes/user")
const cookieParser= require("cookie-parser");
const admin= require("./Routes/admin")
InitMongo();
const app= express();

//port
const PORT = process.env.PORT|| 3000;



//middleware

app.use(bodyParser.json());
app.use(cookieParser());






app.use("/",user)
app.use("/admin",admin)

app.listen(PORT, (req,res)=>{
    console.log(`Server Started at PORT ${PORT}`)
})

