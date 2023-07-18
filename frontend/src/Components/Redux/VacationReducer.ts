import Vacation from "../Model/Vacation";

export class VacationState{
    public vacations:Vacation[]=[]
}

//which actinos we want to expose
export enum VacationActionType{
    addVacation = "AddVacation",
    deleteVacation = "DeleteVacation",
    updateVacation="UpdateVacation",
    getVacations="GetVacations"
}

//how the data structure will be:
//action anf payload
export interface VacationAction{
    type:VacationActionType,
    payload?:any
}


export function addVacationAction(vacation:Vacation):VacationAction{
    return {type: VacationActionType.addVacation,payload:vacation}
}

export function deleteVacationAction(vacation_code:number):VacationAction{
    return {type:VacationActionType.deleteVacation,payload:vacation_code}
}

export function updateVacationAction(vacation:Vacation):VacationAction{
    return {type:VacationActionType.updateVacation,payload:vacation}
}

export function getVacationsAction(vacations:Vacation[]):VacationAction{
    return {type:VacationActionType.getVacations, payload:vacations}
}


//building the reducer by ir's signature '
//we will not handle or use this function - the redux will handle it for us
export function VacationReducer(currentState:VacationState= new VacationState(),action:VacationAction):VacationState{
    const newState = {...currentState} 
    switch(action.type)  {
        case VacationActionType.addVacation:
            newState.vacations = [...newState.vacations,action.payload]
        break
        case VacationActionType.deleteVacation:
            newState.vacations = [...newState.vacations.filter((item)=> item.vacation_code !== action.payload)]
        break
        case VacationActionType.updateVacation:
            newState.vacations = [...newState.vacations.filter((item)=> item.vacation_code !== action.payload.vacation_code)]
            newState.vacations = [...newState.vacations,action.payload]
        break
        case VacationActionType.getVacations:
            newState.vacations = action.payload
        break
    }
    return newState
}