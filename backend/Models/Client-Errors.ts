export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

//"child" client error class
export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `Route ${route} not found`);
  }
}

//"child" vacation error class
export class VacationNotFoundError extends ClientError {
  public constructor(vacation_code: string) {
    super(404, `Vacation code :${vacation_code} was not found`);
  }
}

//"child" user not logged
export class UserNotLoggedError extends ClientError {
  public constructor() {
    super(401, "User not authorized, please login...");
  }
}