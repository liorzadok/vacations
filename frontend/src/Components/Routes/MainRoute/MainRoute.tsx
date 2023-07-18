import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Page404 from "../../Pages/Page404/Page404";
import Main from "../../Layout/Main/Main";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import Admin from "../../Pages/Admin/Admin";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Vacations from "../../Pages/Vacations/Vacations"
import VacationsReport from "../../Pages/VacationsReport/VacationsReport";
import {AdminRoutes, PrivateRoutes} from "../../Utils/PrivateRoutes/PrivateRoutes"
import Reports from "../../Pages/Reports/Reports";


function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/vacations" element={<Vacations/>}/>
                <Route  path="/" element={<Login/>} />
            </Route>
            <Route element={<AdminRoutes/>}>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/addvacation" element={<AddVacation/>}/>
                <Route path="/editvacation" element={<EditVacation/>}/>
            </Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>
        </div>
    );
}

export default MainRoute;
