import { Dayjs } from "dayjs";

class Vacation{
    public vacation_code:number;
    public destination:string;
    public description:string;
    public start_date:Date;
    public end_date:Date;
    public price:number;
    public img:string;

    constructor(vacation_code:number,destination:string,description:string,start_date:Date,end_date:Date,price:number,img:string){
        this.vacation_code=vacation_code
        this.destination=destination
        this.description=description
        this.start_date=start_date
        this.end_date=end_date
        this.price=price
        this.img=img
    }
}

export default Vacation;