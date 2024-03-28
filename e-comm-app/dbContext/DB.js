import sql from "mssql";
import msConfig from "./SqlConfig.js";

export const poolPromise = new sql.ConnectionPool(msConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

export default sql;
