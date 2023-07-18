import "./Admin.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import Vacation from "../../Model/Vacation";
import EditVacation from "../EditVacation/EditVacation";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { my_vacations } from "../../Redux/my_vacations_store";
import { deleteVacationAction } from "../../Redux/VacationReducer";

interface adminVacationProps{
vacation:Vacation
}

const style= {
    position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
}


function Admin(props:adminVacationProps): JSX.Element {
    const navigate= useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditClick = ()=>{
        navigate("/editvacation",{state:props})
    }

    const handleDelete = ()=>{
        my_vacations.dispatch(deleteVacationAction(props.vacation.vacation_code))
        axios.delete(`http://localhost:5000/api/v3/vacations/deleteVacation/${props.vacation.vacation_code}`).then((response)=>{
        })
        handleClose()
    }
    return (
        <div className="Admin">
            <IconButton onClick={handleEditClick}>
			<ModeEditIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleOpen}>
            <ClearIcon color="error"/>
            </IconButton>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Vacation?
                </Typography>
                <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={handleDelete}>
                Yes
                </Button>
                <Button id="modal-modal-description" sx={{ mt: 2 }} onClick={handleClose}>
                No
                </Button>
            </Box>
            </Modal>
        </div>
    );
}

// {/* <Button onClick={handleOpen}>Open modal</Button>
// <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
//   <Box sx={style}>
//     <Typography id="modal-modal-title" variant="h6" component="h2">
//       Text in a modal
//     </Typography>
//     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//     </Typography>
//   </Box>
// </Modal> */}

export default Admin;
