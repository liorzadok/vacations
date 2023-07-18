import User from "../Model/User";

//create the data that should be exposed to the application
export class UserState{
    public users:User[]=[]
    public isLoggedIn:boolean=false
    public isAdmin:boolean=false
    
}

export  enum UserActionType{
    addUser = "addUser",
    deleteUser="deleteUser",
    updateUser="updateUser",
    getUsers = "getUsers",
    getUserByUserCode="getUserByUserCode",
    isLoggedIn= "isLoggedin",
    getUser="getUser",
    updateLikes = "updateLikes",

}

export interface UserAction{
    type:UserActionType,
    payload?:any
}

export function addUserAction(user:User):UserAction{
    return {type:UserActionType.addUser,payload:user}
}

export function deleteUserAction(user_code:number):UserAction{
    return {type:UserActionType.deleteUser,payload:user_code}
}

export function updateUserAction(user:User):UserAction{
    return {type:UserActionType.updateUser,payload:user}
}

export function getUsersAction(users:User[]):UserAction{
    return {type:UserActionType.getUsers,payload:users}
}

export const isLoggedInAction = (isLogged: boolean): UserAction => {
  return { type: UserActionType.isLoggedIn, payload: isLogged };
};

export const getUserAction = (User: User): UserAction => {
  return { type: UserActionType.getUser, payload: User };
};

export const updateLikesAction = (likes: number[]): UserAction => {
  return { type: UserActionType.updateLikes, payload: likes };
};

export function UserReducer(currentState:UserState = new UserState(),action:UserAction){
   const newState = {...currentState}
   switch(action.type){

    case UserActionType.addUser:
    newState.users = [action.payload,...newState.users]

    break
    case UserActionType.deleteUser:
    newState.users = [...newState.users.filter((item)=> item.user_code !== action.payload)]
    break
    case UserActionType.updateUser:
    newState.users = [...newState.users.filter((item)=> item.user_code !== action.payload)]
    newState.users = [...newState.users,action.payload]
    break
    case UserActionType.getUsers:
    newState.users = action.payload
    break
    case UserActionType.getUser:
      if(action.payload.isAdmin){
        newState.isAdmin = true
      } else {
        newState.isAdmin= false
      }
    newState.users= [action.payload]
    break
    case UserActionType.isLoggedIn:
    newState.isLoggedIn = action.payload;
    // if (!action.payload) {
    // newState.users = [];
    // }
    break
    // case UserActionType.getUser:
    // const user = action.payload; 
    //   if (user) {
    //     const likedVacationsString = user.likedVacations || "[]";
    //     const likedVacations = JSON.parse(likedVacationsString) as number[];
    //     const userWithLikedVacations = { ...user, likedVacations };
    //     newState.isAdmin = action.payload.isAdmin;
    //     newState.users = [userWithLikedVacations];
    //   }
    // break;
   }

   return newState
}