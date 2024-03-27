import dotenv from "dotenv";
dotenv.config();
const msConfig = {
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  server: process.env.SERVER,
  options: {
    encrypt: false,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export default msConfig;
