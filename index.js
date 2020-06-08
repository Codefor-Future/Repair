
const express= require("express")
const bodyParser= require("body-parser")
const InitMongo= require("./config/db")
const user= require("./Routes/user")
const cookieParser= require("cookie-parser");

InitMongo();
const app= express();

//port
const PORT = process.env.PORT|| 3000;



//middleware

app.use(bodyParser.json());
app.use(cookieParser());





app.get("/",(req,res)=>{
    res.json({
        message:"API Working"
    })
})
app.get("/signin", user)
app.post("/signin", user)
app.get("/signup", user)
app.post("/signup", user)
app.get("/home", user)
app.get("/data", user)
app.get("/addNewPost",user)
app.post("/addNewPost",user)


app.listen(PORT, (req,res)=>{
    console.log(`Server Started at PORT ${PORT}`)
})

