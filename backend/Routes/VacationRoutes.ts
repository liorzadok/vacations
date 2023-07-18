import express, { Request, Response, NextFunction, request } from "express";
import VacationLogic from "../Logic/VacationLogic";
import { UploadedFile } from "express-fileupload";
import path from "path";
const vacationRouter = express.Router()
const imageFolder = path.join(__dirname,"../images")
//addVacation    => POST   - only admin
vacationRouter.post("/addVacation",async(request:Request,response:Response,next:NextFunction)=>{
    const body = request.body
    console.log("REQUEST BODY:",body);
    response.status(201).json(await VacationLogic.addVacation(body))
})

//vacationList   => GET
vacationRouter.get("/vacationList",async (request:Request,response:Response,next:NextFunction) => {
    response.status(200).json(await VacationLogic.vacationList())
       
})

//deleteVacation => DELETE - only admin
vacationRouter.delete("/deleteVacation/:vacation_code",async(request:Request,response:Response,next:NextFunction)=>{
    const vacationCode = +request.params.vacation_code
    response.status(204).json(await VacationLogic.deleteVacation(vacationCode))

})


//get vacation by vacation code => GET
vacationRouter.get(
    "/getVacation/:vacation_code",
    async (request: Request, response: Response, next: NextFunction) => {
        const vacationCode= +request.params.vacation_code
    response.status(200).json(await VacationLogic.getVacationByVacationCode(vacationCode));
});

//vacationUpdate by vacation_code => PUT - only admin 

vacationRouter.put("/updateVacation",async(request:Request,response:Response,next:NextFunction)=>{
    const vacation= request.body
    response.status(202).json(await VacationLogic.updateVacation(vacation));
})


//upload image file to backend folder => POST - only admin
vacationRouter.post("/uploadFile", async(request:Request,response:Response,next:NextFunction)=>{
    if(!request.files){
        console.log( "no file uploaded");
        return
    }   
    console.log("ok ok ok");
    
    const img  = request.files.img as UploadedFile;    
    img.mv(path.join(imageFolder, img.name))
    response.status(201).json({message:'okay'})

    
})

export default vacationRouter