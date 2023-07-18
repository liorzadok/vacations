import { Badge } from "@mui/material";
import "./User.css";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { my_vacations } from "../../Redux/my_vacations_store";
import axios from "axios";
import { addFollowAction, allFollowersAction, removeFollowAction } from "../../Redux/FollowerRecuder";
import Follower from "../../Model/Follower";


interface vacationProp{
    vacation_code:number
}

function User(props:vacationProp): JSX.Element {
    const user = my_vacations.getState().users.users
    const [followers,setfollowers] = useState<Follower[]>(my_vacations.getState().followers.followers)
    const [refresh, setRefresh] = useState(false);
    const data = { user_code: user[0].user_code, vacation_code: props.vacation_code}
    const vacationFollowersNum = followers.filter((follower)=> follower.vacation_code === props.vacation_code).length
    useEffect(() => {
        //redux

        
        if (my_vacations.getState().followers.followers.length < 1) {
            axios.get("http://localhost:5000/api/v3/followers/allFollowers").then((response) => {
                my_vacations.dispatch(allFollowersAction(response.data));
                setfollowers(response.data)
            });
        }
        
    }, []);

 
    const isVacationFollowed = followers.some(
        (follow) =>
        follow.vacation_code === props.vacation_code &&
        follow.user_code === user[0].user_code
        );
        const [favorite, setFavorite] = useState(isVacationFollowed);
        

    const HandleFavoriteClick = ()=>{
        setFavorite(!favorite)
        if(!favorite){
            my_vacations.dispatch(addFollowAction(data.user_code,data.vacation_code))
            axios.post("http://localhost:5000/api/v3/followers/addFollower",data).then((response)=>{
           
                    setfollowers(my_vacations.getState().followers.followers)
                
            })
        } else {
            my_vacations.dispatch(removeFollowAction(data.user_code,data.vacation_code))
            axios.delete(`http://localhost:5000/api/v3/followers/deleteFollower/${user[0].user_code}/${props.vacation_code}`).then((response)=>{
                setfollowers(my_vacations.getState().followers.followers)
            })
        }
       
    }
    
    return (
        <div className="User">
        <div>{user[0].first_name}</div>
		<Badge badgeContent={vacationFollowersNum} color="primary" aria-label="add to favorites" onClick={HandleFavoriteClick} >
          <FavoriteIcon color={favorite?"error":"disabled"}/>
        </Badge>
        </div>
    );
}

export default User;
