import express, { Request, Response, NextFunction, request } from "express";
import UsersLogic from "../Logic/UsersLogic";


const userRouter = express.Router()

//add a new user  => POST
userRouter.post("/addUser",async(request:Request,response:Response,next:NextFunction)=>{
    const body = request.body
    console.log("REQUEST BODY:",body);
    response.status(201).json(await UsersLogic.addUser(body))
    
})

//get all users => GET
userRouter.get("/userList",async (request:Request,response:Response,next:NextFunction) => {
    response.status(200).json(await UsersLogic.userList())
    
})

//delete user by user_code => DELETE
userRouter.delete("/deleteUser/:user_code",async(request:Request,response:Response,next:NextFunction)=>{
    const userCode= +request.params.user_code
    response.status(204).json(UsersLogic.deleteUser(userCode))
})


// update user details e => PUT
userRouter.put("/updateUser",async(request:Request,response:Response,next:NextFunction)=>{
    const user= request.body
    console.log("update user");
    response.status(202).json(await UsersLogic.updateUser(user));
})

//get user => 
userRouter.post("/getUser",async(request:Request,response:Response,next:NextFunction)=>{
    const user = request.body  
    response.status(200).json(await UsersLogic.getUser(user))

})

//get user by user_code: =>
userRouter.get("/getUserByUserCode/:user_code",async(request:Request,response:Response,next:NextFunction)=>{
    const userCode = +request.params.user_code
    response.status(200).json(await UsersLogic.getUserByUserCode(userCode))
})

userRouter.post(
  "/getUserByEmail",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body;
    response.status(200).json(await UsersLogic.getUserByEmail(email));
  }
);
export default userRouter