import { Box } from "@mui/material";
import MainRoute from "../../Routes/MainRoute/MainRoute";
import Header from "../Header/Header";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <Box className="MainLayout" >
			<header><Header/></header>
            <main><MainRoute/></main>
        </Box>
    );
}

export default MainLayout;
