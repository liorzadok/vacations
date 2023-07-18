import dal from "../Utils/dal";
import User from "../Models/User"
import { OkPacket } from "mysql";
import { response } from "express";



const createUsersTable = ()=> {
const SQLcommand = 
 `CREATE TABLE IF NOT EXISTS my_vacations.users (
  user_code INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  isAdmin BOOLEAN default false,
  PRIMARY KEY (user_code));`

  const response = dal.execute(SQLcommand)
  console.log(response);
  
}


const addUser = async (user:User)=>{
    const SQLcommand =`INSERT INTO my_vacations.users (first_name, last_name, email, password)
     VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}');
` 
    const response:OkPacket= await dal.execute(SQLcommand)
     const userCode= response.insertId
    console.log("New user_code",userCode );
    return userCode
}

const userList = async ()=>{
    const SQLcommand=  `SELECT * FROM my_vacations.users`
   return await dal.execute(SQLcommand)
}

const deleteUser = async (user_code:number)=>{
    const SQLcommand=`DELETE FROM my_vacations.users WHERE user_code=${user_code}`
    await dal.execute(SQLcommand)
    return "deleted"
}

const updateUser = async (user:User)=>{
    const SQLcommand=`UPDATE my_vacations.users SET first_name = '${user.first_name}', last_name = '${user.last_name}', email = '${user.email}', isAdmin = '${user.isAdmin}' 
    WHERE (user_code = '${user.user_code}');`
    await dal.execute(SQLcommand)
    return true;
}

const getUser = async (user: User): Promise<User | null> => {
  const SQLcommand = `SELECT * FROM my_vacations.users WHERE email ='${user.email}'`;
  const [userData] = await dal.execute(SQLcommand);
  if (!userData) {
    return null;
  }
  return userData ? userData : null;
};

const getUserByUserCode= async(user_code:number)=>{
    const SQLcommand=`SELECT * FROM my_vacations.users WHERE user_code='${user_code}'`
    return await dal.execute(SQLcommand)
}

const getUserByEmail = async (user:User) => {
  const SQLcommand = `SELECT * FROM my_vacations.users WHERE email = '${user.email}'`;
  return await dal.execute(SQLcommand)
};

export default {
    createUsersTable,
    addUser,
    userList,
    deleteUser,
    updateUser,
    getUser,
    getUserByUserCode,
    getUserByEmail,
}