const express= require("express");
const app = express();
const cookieparser = require("cookie-parser");
const authmiddleware = require("./middleware/auth");
const trafficRoute = require("./routes/traffic");
const {connectMongoDb} = require("./connection.cjs");
const userRoutes = require("./routes/user");

//Database connection
connectMongoDb("mongodb://127.0.0.1:27017/Gully-map")

//Middlewares
app.use(express.json());
app.use("urlencoded", express.urlencoded({extended: false}));
app.use(cookieparser());
app.use("/api/traffic",authmiddleware, trafficRoute);

//Routes
app.use("/api/users",userRoutes);

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});