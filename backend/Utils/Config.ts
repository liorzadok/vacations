class Config {
  public WebPort = 5000;
  public mySQLhost = "localhost";
  public mySQLuser = "root";
  public mySQLpass = "12345678";
  public mySQLdatabase = "my_vacations";
}

const config = new Config();
export default config;