import "./UserNav.css";
import { useNavigate } from "react-router-dom";

import { Avatar, Button, Typography } from "@mui/material";
// import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserNavProps {
  onLogout: () => void;
  user: string
}

function UserNav({ onLogout, user }: UserNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="UserNav">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      >


        <Typography variant="h4" component="div">
          Travelix
        </Typography>
      </div>
      <div className="middle">
        <Button size="large" color="inherit" onClick={() => navigate("/vacations")}>
          Explore
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
export default UserNav;