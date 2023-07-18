import {  SyntheticEvent, useEffect, useState } from "react";
import SingleVacation from "./SingleVacation/SingleVacation";
import "./Vacations.css";
import Vacation from "../../Model/Vacation";
import axios from "axios";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Pagination, ThemeProvider, Typography } from "@mui/material";
import { my_vacations } from "../../Redux/my_vacations_store";
import { theme } from "../Register/Register";
import { getVacationsAction } from "../../Redux/VacationReducer";
import { userIsAdmin } from "../../Utils/Authentication";
import User from "../../Model/User";
import ReactPaginate from "react-paginate";
import Follower from "../../Model/Follower";
import { allFollowersAction } from "../../Redux/FollowerRecuder";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";


function Vacations(): JSX.Element {
    const [vacationList, setVacationList] = useState<Vacation[]>(my_vacations.getState().vacations.vacations)
    const isAdmin = my_vacations.getState().users.isAdmin
    const nagivate = useNavigate()
    const [selected, setSelected] = useState("")
    const [pageNumber,setPageNumber]= useState(1)
    const userCode = my_vacations.getState().users.users[0].user_code
    const [followers,setfollowers]= useState<Follower[]| null>(my_vacations.getState().followers.followers)
    const vacationsPerPage= 10
    const pagesVisited = pageNumber * vacationsPerPage
    const handleChange = (event: any, value: any) => {
    setPageNumber(value);
  };

    useEffect(()=>{
        if(vacationList.length < 1){
            axios.get('http://localhost:5000/api/v3/vacations/vacationList').then((response)=>{
                my_vacations.dispatch(getVacationsAction(response.data))
                setVacationList(() => my_vacations.getState().vacations.vacations);
                // setRefresh(true);
            })}
        if(followers=== null||followers.length <1 ){
            axios.get(`http://localhost:5000/api/v3/followers/allFollowers`).then((response)=>{
           
                
                my_vacations.dispatch(allFollowersAction(response.data))
                setfollowers(my_vacations.getState().followers.followers)
            })
        }
            // setRefresh(!refresh);
        },[])
        
        
        
        my_vacations.subscribe(()=>{
            setVacationList(my_vacations.getState().vacations.vacations);
            setfollowers(my_vacations.getState().followers.followers)
        })
        



const getFollowedVacations = (event:SyntheticEvent)=>{
    const input = event.target as HTMLInputElement
    const userFollowedVacations = followers?.filter((follower)=> follower.user_code === userCode)
    if(input.checked){
    if(userFollowedVacations){
        const vacationsCodes = userFollowedVacations.map((follower)=> follower.vacation_code)
        const filteredVacationsByUser = vacationList.filter((vacation)=>
            vacationsCodes.includes(vacation.vacation_code))
            setVacationList(filteredVacationsByUser);
            
        }  
    } else{
        setVacationList(my_vacations.getState().vacations.vacations)
        
    }
}

const futureVacations = (event:SyntheticEvent)=>{
    const input = event.target as HTMLInputElement
    if(input.checked){
    const today = new Date()
    const dates = vacationList.filter((vacation)=>
    new Date(vacation.start_date) >= today)
    setVacationList(dates)
    } else {
        setVacationList(my_vacations.getState().vacations.vacations)
    }
}

const currentVacations = (event:SyntheticEvent)=>{
    const input = event.target as HTMLInputElement
    if(input.checked){
        const today = new Date()
        const dates = vacationList.filter((vacation)=> new Date(vacation.start_date) <= today && new Date(vacation.end_date)> today)
        setVacationList(dates)
        
    } else {
        setVacationList(my_vacations.getState().vacations.vacations)
    }
}
    return (
        <ThemeProvider theme={theme}>
        {!isAdmin && <FormGroup row={true} sx={{display:'flex',justifyContent:'center', color: 'white',}} >
          <FormControlLabel control={<Checkbox onChange={getFollowedVacations}   sx={{
    color: "white"
  }}/>} label="Followed vacations"  />
          <FormControlLabel control={<Checkbox onChange={futureVacations}   sx={{
    color: "white",
  }}/>} label="Future vacations" />
          <FormControlLabel control={<Checkbox onChange={currentVacations}   sx={{
    color: "white"
  }}/>} label="Current vacations" />
          </FormGroup> }
       
        <Typography
        
          component="h2"
          variant="h2"
          align="center"
          color="text.white"
          gutterBottom
          sx={{color:'white'}}
        >
    
        </Typography>
      
        <Box className="Vacations" sx={{display:'flex',flexWrap: 'wrap',flexDirection:'row', justifyContent:'center', pt:2 ,gap:2}}>    
           {vacationList.slice((pageNumber - 1) * vacationsPerPage, pageNumber * vacationsPerPage).map((item)=>(
               <SingleVacation 
               key={item.vacation_code}
               vacation_code={item.vacation_code} 
               destination={item.destination} 
               description={item.description} 
               start_date={item.start_date} 
               end_date={item.end_date} 
               price={item.price} 
               img={`http://localhost:5000/${item.img}`}
               isAdmin={isAdmin}
               />
           ))}
        </Box>
        <Pagination count={Math.ceil(
          my_vacations.getState().vacations.vacations.length / vacationsPerPage
        )} variant="outlined" shape="rounded" page={pageNumber} onChange={handleChange} />
        </ThemeProvider>
    );
}

export default Vacations;
