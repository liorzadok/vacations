class User{
    public user_code:number;
    public first_name:string;
    public last_name:string;
    public email:string;
    public password:string;
    public isAdmin:boolean;
    public likedVacations: number[]

    constructor(user_code:number,first_name:string,last_name:string,email:string,password:string,isAdmin:boolean,likedVacations:number[]){
        this.user_code = user_code
        this.first_name=first_name
        this.last_name=last_name
        this.email=email
        this.password=password
        this.isAdmin=isAdmin
        this.likedVacations=likedVacations
    }
}


export default User;