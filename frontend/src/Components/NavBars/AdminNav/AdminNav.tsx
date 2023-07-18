import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Typography } from "@mui/material";
// import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdminNavProps {
  onLogout: () => void;
  user: string
}

function AdminNav({ onLogout, user }: AdminNavProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="AdminNav">
      <div
        className="logo"
        onClick={() => {
          navigate("/vacations");
        }}
        style={{ cursor: "pointer" }}
      >
 
        <Typography variant="h4" component="div">
          Travelix
        </Typography>
      </div>

      <div className="middle">
        <Button
          size="large"
          color="inherit"
          onClick={() => {
            navigate("/addVacation");
          }}
        >
          Add Vacation
        </Button>
        <Button size="large" color="inherit" onClick={() => navigate("/vacations")}>
          Explore
        </Button>

        <Button
          size="large"
          color="inherit"
          onClick={() => {
            navigate("/reports");
          }}
        >
          Reports
        </Button>
      </div>

      <div className="right">
        <Typography>{user }</Typography>
        <Avatar sx={{ width: 40, height: 40 }}></Avatar>

        <Button
          size="large"
          sx={{ height: "2rem" }}
          color="inherit"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AdminNav;