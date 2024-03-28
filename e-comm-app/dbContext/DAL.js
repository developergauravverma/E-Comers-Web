import sql, { poolPromise } from "./DB.js";

export const getDataFromDatabase = async (
  procedureName,
  objParamWithKeyAndValue = {},
  objParamType = {}
) => {
  const pool = await poolPromise;
  let request = await pool.request();
  for (let key in objParamWithKeyAndValue) {
    const type = GETvalueByKey(key, objParamType);
    if (type === "text")
      request.input(key, sql.NVarChar, objParamWithKeyAndValue[key]);
    else if (type === "date")
      request.input(key, sql.Date, objParamWithKeyAndValue[key]);
    else if (type === "int")
      request.input(key, sql.Int, objParamWithKeyAndValue[key]);
  }

  const result = await request.execute(procedureName);
  const recordLength = result.recordset.length;
  await sql.close();
  return recordLength > 1 ? result.recordsets[0] : result.recordset[0];
};

export const GETvalueByKey = (key, obj) => {
  let val = null;
  for (let sKey in obj) {
    if (sKey === key) {
      val = obj[sKey];
    }
  }
  return val;
};
