import "./SingleVacation.css";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import paris from '../../../../../src/vacation_images/paris.jpg'
import { Dayjs } from "dayjs";
import moment from "moment";
import Admin from "../../Admin/Admin";
import User from "../../User/User";
import EditVacation from "../../EditVacation/EditVacation";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


interface singleVacationProps {
    vacation_code:number;
    destination:string;
    description:string;
    start_date:Date;
    end_date:Date;
    price:number;
    img:string;
    isAdmin: boolean;
}



function SingleVacation(props:singleVacationProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        // <div className="SingleVacation" sx={{display:'inline'}}>
			<Card sx={{ width:300, maxWidth: 350, m:3}}> 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="vacation">
            {props.destination.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.destination}
        subheader="buy now"
      />
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt="Paris img"
      />
      <CardContent>
          <Typography variant="body2" color="text.secondary">
          <> Dates: {moment(props.start_date).format('DD/MM/YYYY')} - {moment(props.end_date).format('DD/MM/YYYY')}   </>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {props.price}$
        </Typography>
          <Typography paragraph>
            {props.description}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.isAdmin?<Admin vacation={props}/>:<User vacation_code={props.vacation_code}/>}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More info:</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, molestias minus quod ut asperiores eos iure eius sit est minima qui nisi libero eveniet perferendis omnis praesentium? Quidem, officiis enim.
            Voluptas excepturi ad dolores, debitis, reiciendis veniam blanditiis, ab doloribus doloremque aliquam repellat nihil assumenda possimus aperiam earum pariatur nobis? Sint, iste omnis. Sit blanditiis magni consequatur at dolores nostrum!
            Nam ea suscipit blanditiis odio quos eius in unde, quo minima libero debitis commodi, cupiditate fugiat ut! Voluptas at similique officiis eaque, enim animi molestiae, vitae cum vero minus odit?
            Recusandae atque natus tempore totam sit neque molestiae dolore sequi dolor tempora eaque autem iure fugit, illo repellat vero harum ducimus quas, in deserunt impedit? Pariatur consequatur ut odit ipsam.
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, molestias minus quod ut asperiores eos iure eius sit est minima qui nisi libero eveniet perferendis omnis praesentium? Quidem, officiis enim.
            Voluptas excepturi ad dolores, debitis, reiciendis veniam blanditiis, ab doloribus doloremque aliquam repellat nihil assumenda possimus aperiam earum pariatur nobis? Sint, iste omnis. Sit blanditiis magni consequatur at dolores nostrum!
            Nam ea suscipit blanditiis odio quos eius in unde, quo minima libero debitis commodi, cupiditate fugiat ut! Voluptas at similique officiis eaque, enim animi molestiae, vitae cum vero minus odit?
            Recusandae atque natus tempore totam sit neque molestiae dolore 
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni tempore, quia, quis id vitae perferendis ea nostrum eum accusamus alias dolorem est assumenda deleniti quod quae, illum cupiditate nemo dolorum?          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        // </div>
    );
}

export default SingleVacation;
