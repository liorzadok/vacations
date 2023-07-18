import { OkPacket } from "mysql"
import Follower from "../Models/Follower"
import dal from "../Utils/dal"
import Vacation from "../Models/Vacation";

const createFollowersTable = ()=>{
    const SQLcommand = `CREATE TABLE IF NOT EXISTS my_vacations.followers (
    user_code INT NOT NULL,
    vacation_code INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_code)
    REFERENCES my_vacations.users (user_code),
    FOREIGN KEY (vacation_code)
    REFERENCES my_vacations.vacations (vacation_code));`

    const response = dal.execute(SQLcommand)
    console.log(response);

}

const addFollower = async(follower:Follower)=>{
  const SQLcommand= `INSERT INTO my_vacations.followers (user_code, vacation_code) 
  VALUES ('${follower.user_code}', '${follower.vacation_code}');`
  return await dal.execute(SQLcommand)
}

const followerList = async ()=>{
  const SQLcommand= `SELECT * FROM my_vacations.followers`;
  return await dal.execute(SQLcommand)
}


const deleteFollower = async(user_code:number,vacation_code:number)=>{
  const SQLcommand= `DELETE  FROM my_vacations.followers WHERE user_code=${user_code} AND vacation_code=${vacation_code}`
  await dal.execute(SQLcommand)
  return true
}

const followersByVacationCode = async(vacation_code:number)=>{
  const SQLcommand=`SELECT * FROM my_vacations.followers WHERE vacation_code=${vacation_code}`
  return await dal.execute(SQLcommand)
}

const followersByUserCode = async(user_code:number)=>{
  const SQLcommand=`SELECT * FROM my_vacations.followers WHERE user_code=${user_code}`
  return await dal.execute(SQLcommand)
}

const toggleLike = async (userId: number, vacationId: number) => {
  const userSql = `
    SELECT likedVacations
    FROM users
    WHERE user_code = '${userId}'
  `;
  const userResult: { likedVacations: string }[] = await dal.execute(
    userSql
  );
  const currentLikedVacations: number[] = userResult[0].likedVacations
    ? JSON.parse(userResult[0].likedVacations)
    : [];

  if (currentLikedVacations.includes(vacationId)) {
    // Remove the like

    const index = currentLikedVacations.indexOf(vacationId);
    currentLikedVacations.splice(index, 1);

    const removeLikeSql = `
      DELETE FROM followers
      WHERE vacation_code = '${vacationId}' AND user_code = '${userId}'
    `;
    await dal.execute(removeLikeSql);

    const updateVacationSql = `
      UPDATE vacations
      SET likes = likes - 1
      WHERE vacation_code = '${vacationId}'
    `;
    await dal.execute(updateVacationSql);
  } else {
    currentLikedVacations.push(vacationId);

    const addLikeSql = `
      INSERT INTO followers (vacation_code, user_code)
      VALUES ('${vacationId}', '${userId}')
    `;
    await dal.execute(addLikeSql);

    const updateVacationSql = `
      UPDATE vacations
      SET likes = likes + 1
      WHERE vacation_code = '${vacationId}'
    `;
    await dal.execute(updateVacationSql);
  }

  const updateLikedVacationsSql = `
    UPDATE users
    SET likedVacations = '${JSON.stringify(currentLikedVacations)}'
    WHERE user_code = '${userId}'
  `;
  await dal.execute(updateLikedVacationsSql);
};

const getLikesByUser = async (userId: number) => {
  const sql = `
      SELECT vacations.vacation_code
      FROM vacations.followers
      INNER JOIN my_vacations.vacations ON followers.vacation_code = vacations.vacation_code
      WHERE followers.user_code = '${userId}'  
    `;
  const result: Vacation[] = await dal.execute(sql);
  return result;
};

const getLikesPerVacation = async () => {
  const sql = `
      SELECT destination, likes
      FROM my_vacations.vacations
    `;
  const result: any = await dal.execute(sql);
  return result;
};
export default {
    createFollowersTable,
    addFollower,
    followerList,
    deleteFollower,
    followersByVacationCode,
    toggleLike,
    getLikesByUser,
    followersByUserCode
}