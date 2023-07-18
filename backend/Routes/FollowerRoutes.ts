import express, { Request, Response, NextFunction, request } from "express";
import FollowersLogic from "../Logic/FollowersLogic";
//

const followerRouter = express.Router()

//adding a new follower by clicking the heart
followerRouter.post("/addFollower",async(request:Request,response:Response,next:NextFunction)=>{
    const result = await FollowersLogic.addFollower(request.body);
    response.status(201).json(result);
  
})

// get all the followers 
followerRouter.get("/allFollowers",async(request:Request,response:Response,next:NextFunction)=>{
    response.status(200).json(await FollowersLogic.followerList())
})

// deleting a follower by clicking again on the heart
followerRouter.delete("/deleteFollower/:user_code/:vacation_code", // check if possible to delete by the user code
  async (request: Request, response: Response, next: NextFunction) => {
    const user_code = +request.params.user_code
    const vacation_code= +request.params.vacation_code
    response.status(204).json(await FollowersLogic.deleteFollower(user_code,vacation_code));
  });


// get all the followers by vacation id
followerRouter.get("/followersList/:vacation_code",  
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.vacation_code
    response.status(200).json(await FollowersLogic.followersByVacationCode(vacationCode))
  });

//get all the vacations a user is following
followerRouter.get("/followersListByUserCode/:user_code",
async(request:Request,response:Response,next:NextFunction)=>{
  const userCode = +request.params.user_code
  response.status(200).json(await FollowersLogic.followersByUserCode(userCode))
})

//check if the main page works



export default followerRouter