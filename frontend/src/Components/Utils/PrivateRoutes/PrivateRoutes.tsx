import { Navigate, Outlet } from "react-router-dom";
import { my_vacations } from "../../Redux/my_vacations_store";

const userAuth = () => {
  const userLogged = my_vacations.getState().users.isLoggedIn;
  const user = my_vacations.getState().users.users; 
  return { userLogged, user };
};

const PrivateRoutes = () => {
  const { userLogged } = userAuth();
  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoutes = () => {
  const {userLogged,user}= userAuth();
  
  if (userLogged === true) {
    const user = my_vacations.getState().users.users[0];
    
    return user.isAdmin ? <Outlet /> : <Navigate to="/*" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export { PrivateRoutes, AdminRoutes };