import sql from "mssql";
import SqlConfig from "./SqlConfig.js";

export const conn = async () => {
  try {
    const appPool = new sql.ConnectionPool(SqlConfig);
    appPool
      .connect()
      .then(async function (pool) {
        console.log(`Database connected successfully`);
        appPool.close();
      })
      .catch(function (err) {
        console.error("Database Error creating connection pool", err);
      });
  } catch (err) {
    console.log(err);
  }
};
