import { my_vacations } from "../Redux/my_vacations_store";

export const userLoggedIn = () => {
  return my_vacations.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const isAdmin = my_vacations.getState().users.isAdmin; 
    return isAdmin;
  } else {
    return false;
  }
}