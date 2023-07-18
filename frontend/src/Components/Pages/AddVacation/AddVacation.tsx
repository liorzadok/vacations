import "./AddVacation.css";
import {useForm} from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker'
import { PhotoCamera } from "@mui/icons-material";
import { CardMedia, IconButton } from "@mui/material";
import Vacation from "../../Model/Vacation";
import React, {SyntheticEvent, useRef, useState} from 'react';
import dayjs from "dayjs";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from "axios";
import { my_vacations } from "../../Redux/my_vacations_store";
import { addVacationAction } from "../../Redux/VacationReducer";
import { useNavigate } from "react-router-dom";



const defaultTheme = createTheme();

function AddVacation(): JSX.Element {
  const {register,handleSubmit,formState:{errors},trigger, getValues,reset}= useForm<Vacation>()
 const [image, setImage] = useState<string>();
 const [add, setAdd] = useState<string>("")
 const navigate = useNavigate()
const send= (formData:any)=>{
 
  
  const vacation_data = {
    destination: formData.destination,
    description:formData.description,
    start_date: formData.start_date,
    end_date: formData.end_date,
    price:formData.price,
    img: formData.img[0].name
  }
  axios.post("http://localhost:5000/api/v3/vacations/addVacation", vacation_data).then((response)=>{
    const vacation_code = response.data;
  my_vacations.dispatch(
    addVacationAction({ ...vacation_data, vacation_code: vacation_code })
  );
  })
  uploadImage(formData.img);
   setAdd("vacation Added!")
   reset()
   navigate('/vacations')
}

const  uploadImage = async(img_files:any)=>{
    
    
    const image_data = new FormData()
    image_data.set("img",img_files[0])
    
    await axios.post("http://localhost:5000/api/v3/vacations/uploadFile", image_data).then((response)=>{
      console.log("okay");
      
  
    })
  
}

const handleImage =(event:SyntheticEvent)=>{
  const input = event.target as HTMLInputElement
  if (!input.files) return
  const url = URL.createObjectURL(input.files[0])
  setImage(url)

}

    return (
        <div className="AddVacation">
	<ThemeProvider theme={defaultTheme}>
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
            Add Vacation
          </Typography>
          <form  onSubmit={handleSubmit(send)} noValidate>
            <TextField {...register("destination",{required:{value:true,message:"This field is required"}})}
              margin="normal"
              required
              fullWidth
              id="destination"
              label="Destination"
              name="destination"
              autoComplete="destination"
              autoFocus
                error={!!errors.destination}
            helperText={errors.destination?.message}
            />
            <TextField
            {...register("description",{required:{value:true,message:"This field is required"}})}
            margin="normal"
            id="outlined-multiline-static"
            multiline
            required
            rows={4}
            fullWidth
            name="description"
            label="Description"
            autoComplete="description"
            error={!!errors.description}
            helperText={errors.description?.message}
            />
             <span>{errors.description?.message}</span>
        <div className="dateDiv">
          <Typography variant="subtitle2">Start Date</Typography>
          <TextField
            required
            type="date"
            id="start_date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("start_date", {required:{value:true, message:"This field is required"}})}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            onBlur={() => trigger("start_date")}
          />

          <Typography variant="subtitle2">End Date</Typography>
          <TextField
            required
            type="date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("end_date", {required:true, validate:{endDate:(value)=>{
                  const startDate = new Date(getValues("start_date")); 
                  const finishDate = new Date(value); 
                  return finishDate >= startDate;
            }}})}
            error={Boolean(errors.end_date)}
            helperText={errors.end_date &&  "End date is required and must be later than start date"}
            onBlur={() => trigger("end_date")}
          />
        </div>
        <TextField
              {...register("price",{required:true, min: 0, max: 10000})}
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              inputProps={{min:0, max:10000}}
              autoComplete="price"
              autoFocus  
              error={Boolean(errors.price)}
              helperText={errors.price&& "Price is required and must be between 0 and 10000"}
              
        />
        <CardMedia
          component="div"
          id="preview"
          sx={{
            
              pt: '56.25%',
            }}
          image={image}
        />
        <Typography>Upload</Typography>
        <TextField   type="file" {...register("img",{required:{value:true,message:"This field is required"}})} onChange={handleImage} 
            required
            error={!!errors.img}
            helperText={errors.img?.message}
        />
     
                
        <IconButton color="primary" aria-label="upload picture" component="label">
        <PhotoCamera />
        </IconButton>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add New Vacation
            </Button>
          </form>
        </Box>
        <Typography>{add}</Typography>
      </Container>
    </ThemeProvider>
        </div>
    );
}

export default AddVacation;
