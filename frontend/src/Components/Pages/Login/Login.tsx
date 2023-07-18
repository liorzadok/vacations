import "./Login.css";
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
import User from "../../Model/User";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { my_vacations } from "../../Redux/my_vacations_store";
import {  getUserAction, isLoggedInAction } from "../../Redux/UserReducer";
import { theme } from "../Register/Register";



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

// const defaultTheme = createTheme();


function Login(): JSX.Element {
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}}= useForm<User>()
  const [authError,setAuthError]=useState("")

const toVacationsPage = (user:string)=>{
  if(!user){
    navigate("/login")
  } else{ 
    navigate("/vacations")
  }
}



  const formSubmitHandler =(formData:User)=>{
    axios.post(`http://localhost:5000/api/v3/users/getUser/`,formData).then((response)=>{
      if(my_vacations.dispatch(getUserAction(response.data)).payload){
          
        if(formData.password === response.data.password){
          my_vacations.dispatch(isLoggedInAction(true))
          my_vacations.dispatch(getUserAction(response.data)) 
          toVacationsPage(response.data.first_name)
        } else if(formData.password !== response.data.password){ 
          setAuthError("wrong password")
        }
      } else{
        setAuthError("No user found with this email address")
      }
    })
    
  }

    return (
    <div className="Login">
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(formSubmitHandler)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register("email",{required:{value: true,message: "Email is required"},
               pattern: {value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
               message:"Please enter a valid email"}})}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              
              autoComplete="email"
              autoFocus
            />
            <span className="auth">{errors.email?.message}</span>
            <TextField
              {...register("password" ,{required:{value:true, message:"Password is required"},minLength:{value:4, message:"Password has to be at least 4 characters"}})}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div className="auth">{errors.password?.message || authError}</div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link sx={{color:"black"}} href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    );
}

export default Login;
