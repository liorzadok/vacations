import  { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import "./Header.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";


import { getUserAction, isLoggedInAction } from "../../Redux/UserReducer"
import { userIsAdmin, userLoggedIn } from "../../Utils/Authentication";
import { my_vacations } from "../../Redux/my_vacations_store";
import AdminNav from "../../NavBars/AdminNav/AdminNav";
import UserNav from "../../NavBars/UserNav/UserNav";
import { deepOrange } from "@mui/material/colors";

function Header(): JSX.Element {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const loggedIn = userLoggedIn();
  const isAdmin = userIsAdmin();

  useEffect(() => {
    if (loggedIn) {
     
      const user = my_vacations.getState().users.users[0]; 
      my_vacations.dispatch(getUserAction(user))
      setName(user.first_name + " " + user.last_name);
      
    }
  }, [loggedIn]);

  const handleLogout = () => {
    my_vacations.dispatch(isLoggedInAction(false));
    // my_vacations.subscribe((isLoggedInAction))
   
    
    
    navigate("/login");
  };

 

  return (
    <div className="Header">
      <AppBar color="primary" style={{ position: "static" , background: deepOrange[300]}}>
        <Toolbar>
          {!loggedIn ? (
            <>
              <div
                className="logo"
                onClick={() => {
                  navigate("/vacations" );
                }}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="h4" component="div">
                  Trevalix
                </Typography>
              </div>
              <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Stack>
            </>
          ) : isAdmin ? (
            <AdminNav onLogout={handleLogout} user={name} />
          ) : (
            <UserNav onLogout={handleLogout} user={name} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
