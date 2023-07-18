import { BarChart } from "@mui/x-charts";
import { my_vacations } from "../../Redux/my_vacations_store";
import "./Reports.css";
import { Box, Button } from "@mui/material";
import {CSVLink} from  "react-csv"

function Reports(): JSX.Element {
    const vacations = my_vacations.getState().vacations.vacations
    const followers = my_vacations.getState().followers.followers

  const followersNumber = vacations.map((vacation) => ({
    vacationCode: vacation.vacation_code,
    followers: followers.filter(
      (follower) => follower.vacation_code === vacation.vacation_code
    ).length,
  }));

  
  

    const data = vacations.map((vacation) => ({
    Destination: vacation.destination,
    Followers:
      followersNumber.find(
        (follower) => follower.vacationCode === vacation.vacation_code
      )?.followers || 0,
  }));

  const destinations = data.map(item=> item.Destination);
  const nums = data.map(item=> item.Followers)
    return (
<Box className="Reports" sx={{display:'flex', flexWrap: 'wrap',justifyContent:'center' }}>
<BarChart 
  xAxis={[
    {
      id: 'barCategories',
      data: destinations,
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: nums,
      color:"#ff7f0e"
    },
  ]}
  width={1500}
  height={300}
/>
      <Button variant="contained" sx={{ marginTop: 2, zIndex: 1 }}>
      <CSVLink
        data={data}
        filename={"vacations.csv"}
        style={{ color: "white" }}
      >
        Download CSV
      </CSVLink>
    </Button>
</Box>
    );
}
export default Reports;
