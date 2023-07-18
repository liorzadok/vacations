import "./Register.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { set, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import User from "../../Model/User";
import { addUserAction, getUserAction, isLoggedInAction } from "../../Redux/UserReducer";
import { my_vacations } from "../../Redux/my_vacations_store";
import Vacation from "../../Model/Vacation";
import { userIsAdmin } from "../../Utils/Authentication";
import { subscribe } from "diagnostics_channel";
import { Notyf } from "notyf"


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/liorzadok">
        My GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    
  },
  
});



function Register(): JSX.Element {
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}}= useForm<User>()
  const [authError,setAuthError]=useState("")

  const [users,setUserList ]= useState<User[]>(
  my_vacations.getState().users.users
  )


  const toVacationsPage = (user:string)=>{
  
    if(!user){
    navigate("/register")
  } else{ 
    navigate("/vacations")
  }
}

   const formSubmitHandler =(formData:User)=>{
     
    axios.post(`http://localhost:5000/api/v3/users/getUserByEmail`, formData).then((response)=>{
      
      if(response.data[0]){
       setAuthError("This email is already registered, please try again");
      } else {
        axios.post(`http://localhost:5000/api/v3/users/addUser/`,formData).then((response)=>{ 
          axios.get(`http://localhost:5000/api/v3/users/getUserByUserCode/${response.data}`).then((response)=>{
            my_vacations.dispatch(addUserAction(response.data[0]))
          })
          my_vacations.dispatch(isLoggedInAction(true));
          toVacationsPage(formData.first_name+' '+formData.last_name)
        })
      }
    })}
    my_vacations.subscribe(()=>{
      setUserList(my_vacations.getState().users.users)})
    return (
      <div className="Register">
			<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form"  onSubmit={handleSubmit(formSubmitHandler)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register("first_name" ,{required:{value:true, message:"This field is required"}})}
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("last_name",{required:{value: true, message: "This field is required" }})}
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
                <span>{errors.first_name?.message}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
              {...register("email",{required: true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
                  required
                  fullWidth
                  onKeyUp={() => setAuthError('')}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                   error={Boolean(errors.email)}
                  helperText={
                    errors.email &&
                    "Email is required and must be a valid email address"
                  }
                />
                { authError&& <span>this email is already taken...</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password" ,{required:{value:true, message:"Password is required"},minLength:{value:4, message:"Password has to be at least 4 characters"}})}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <span className="auth">{errors.password?.message}</span>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link sx={{color:"black"}} href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
        </div>
    );

}

export default Register;


