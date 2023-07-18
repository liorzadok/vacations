// user_code, private_name, last_name, email, password, role
class User {
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public isAdmin: boolean;
  public user_code: number;
  public likedVacations: number[];

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    user_code: number,
    likedVacations: number[]
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.user_code = user_code;
    this.likedVacations = likedVacations;
  }
}

export default User;