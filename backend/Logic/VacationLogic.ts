import { OkPacket } from "mysql"
import Vacation from "../Models/Vacation"
import dal from "../Utils/dal"

//create vacation table
const createVacationsTable =()=>{
    const SQLcommand = `CREATE TABLE IF NOT EXISTS my_vacations.vacations (
  vacation_code INT NOT NULL AUTO_INCREMENT,
  destination VARCHAR(45) NOT NULL,
  description VARCHAR(255) NOT NULL,
  start_date DATE  NULL,
  end_date DATE  NULL,
  price INT NOT NULL,
  img VARCHAR(255) NOT NULL,
  PRIMARY KEY (vacation_code));`

  const response = dal.execute(SQLcommand)
  console.log(response);
  
}
//add a new vacation
const addVacation = async (vacation:Vacation)=>{
    const SQLcommand= `INSERT INTO my_vacations.vacations (destination, description, start_date, end_date, price, img)
     VALUES ('${vacation.destination}', '${vacation.description}','${vacation.start_date}', '${vacation.end_date}', '${vacation.price}', '${vacation.img}')`
     const response:OkPacket= await dal.execute(SQLcommand)
     const vacationCode= response.insertId
    console.log("New vacation_code",vacationCode );
    return vacationCode
}
const vacationList = async () =>{
    const SQLcommand = `SELECT * FROM my_vacations.vacations ORDER BY start_date`;
    return await dal.execute(SQLcommand);
}


const deleteVacation = async (vacation_code:number)=>{
    const SQLcommand = `DELETE FROM my_vacations.vacations WHERE vacation_code=${vacation_code}`
   return await dal.execute(SQLcommand)
  
}
const getVacationByVacationCode = async (vacation_code:number)=>{
    const SQLcommand = `SELECT * FROM my_vacations.vacations WHERE vacation_code=${vacation_code}`
    return await dal.execute(SQLcommand)
}

const updateVacation = async (vacation:Vacation)=>{
    const SQLcommand = `UPDATE my_vacations.vacations 
    SET destination = '${vacation.destination}', description = '${vacation.description}', start_date = '${vacation.start_date}',
     end_date = '${vacation.end_date}', price = '${vacation.price}', img = '${vacation.img}' 
     WHERE (vacation_code = '${vacation.vacation_code}');`
    await dal.execute(SQLcommand)
    return true;
}


export default{
    vacationList,
    addVacation,
    deleteVacation,
    getVacationByVacationCode,
    updateVacation,
    createVacationsTable,
}