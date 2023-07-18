//imports
import express from "express";
import cors from "cors"; 
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

//import routers
import vacationRouter from "./Routes/VacationRoutes";
import userRouter from "./Routes/UserRoutes";
import followerRouter from "./Routes/FollowerRoutes";
import config from "./Utils/Config";

//import logic
import VacationLogic from "./Logic/VacationLogic";
import FollowersLogic from "./Logic/FollowersLogic";
import UsersLogic from "./Logic/UsersLogic";

//import route-not-found middleware
import ErrorHandler from "./MiddleWare/route-not-found";
//create server
const server = express();

//handle cors
server.use(cors());

//how do we send the data back
server.use(express.json())

//where i'll save the vacation files
server.use(express.static('images'))

//enable file uploading, and create a path for the files if it doesn't exists
server.use(fileUpload({createParentPath:true}))

//parse the body as json
server.use(bodyParser.json())

//how to use the routes:
server.use("/api/v3/vacations",vacationRouter)
server.use("/api/v3/followers",followerRouter)
server.use("/api/v3/users",userRouter)

//create our tables in they do not exists:
VacationLogic.createVacationsTable()
UsersLogic.createUsersTable()
FollowersLogic.createFollowersTable()

//handle errors
server.use("*",ErrorHandler)

//start the server
server.listen(config.WebPort,()=>{console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
})



