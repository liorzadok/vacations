import { useLocation, useNavigate } from "react-router-dom";
import Vacation from "../../Model/Vacation";
import "./EditVacation.css";
import { ThemeProvider } from "@emotion/react";
import { Avatar, Box, Button, CardMedia, Container, CssBaseline, IconButton, TextField, Typography, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { my_vacations } from "../../Redux/my_vacations_store";
import { updateVacationAction } from "../../Redux/VacationReducer";

const defaultTheme = createTheme();


function EditVacation(): JSX.Element {
    const {register,handleSubmit,formState:{errors},trigger,getValues,reset}= useForm<Vacation>()
    const location = useLocation();
    const currentVacation = location.state.vacation;
    const [image, setImage]= useState(currentVacation.img)
    const navigate = useNavigate()

    const checkImageName= (imgName:string)=>{
    if(imgName.includes('localhost')){
      return imgName.slice(22)
    } else {
      return imgName
    }
  }
const send= (formData:any)=>{
 
  const vacation_data = {
    vacation_code:currentVacation.vacation_code,
    destination: formData.destination,
    description:formData.description,
    start_date: formData.start_date,
    end_date: formData.end_date,
    price:formData.price,
    img: (!formData.img[0])? checkImageName(currentVacation.img) :formData.img[0].name
  }
 

  
  axios.put("http://localhost:5000/api/v3/vacations/updateVacation", vacation_data).then((response)=>{ 
    my_vacations.dispatch(
      updateVacationAction(vacation_data)
    );
       
  })
  uploadImage(formData.img);
  //  reset()
   navigate("/vacations")
   
}

const  uploadImage = async(img_files:any)=>{
    
    const image_data = new FormData()
    image_data.set("img",img_files[0])
    
    await axios.post("http://localhost:5000/api/v3/vacations/uploadFile", image_data).then((response)=>{
  
    })
  
}

const handleImage = (event:SyntheticEvent)=>{
   const input = event.target as HTMLInputElement
  if (!input.files) return
  const url = URL.createObjectURL(input.files[0])
  setImage(url)
}
    return (
        <div className="EditVacation">
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
            Edit Vacation
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
              defaultValue={currentVacation.destination}
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
            defaultValue={currentVacation.description}
            error={!!errors.description}
            helperText={errors.description?.message}
            />
        <div className="dateDiv">
          <Typography variant="subtitle2">Start Date</Typography>
          <TextField
            type="date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("start_date", {required:{value:true, message:"This field is required"}})}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            onBlur={() => trigger("start_date")}
            defaultValue={new Date(currentVacation.start_date).toISOString().slice(0,10)}
          />
          <Typography variant="subtitle2">End Date</Typography>
          <TextField
            type="date"
            inputProps={{ min: new Date().toISOString().slice(0, 10) }}
            {...register("end_date", {required:true, validate:{endDate:(value)=>{
                  const startDate = new Date(getValues("start_date")); 
                  const finishDate = new Date(value); 
                  return finishDate >= startDate;
            }}})}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            onBlur={() => trigger("end_date")}
            defaultValue={new Date(currentVacation.end_date).toISOString().slice(0,10)}
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
              autoComplete="price"
              inputProps={{min:0, max:10000}}
              autoFocus
              defaultValue={currentVacation.price}
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
        <Typography>Upload:</Typography>
          <TextField   type="file" {...register("img",{required:{value:false,message:"This field is required"}})} onChange={handleImage}
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
              Edit Vacation
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
        </div>
    );
}

export default EditVacation;
