import { getDataFromDatabase } from "./DAL.js";

export const isEmailExists = async (email) => {
  let isEmailExists = false;
  try {
    isEmailExists = await getDataFromDatabase(
      "sp_FindUserByEmail",
      { email: email },
      { email: "text" }
    );
  } catch (error) {
    console.log(`error in User BAL ${error}`);
  }
  return isEmailExists;
};

export const createNewUser = async (
  name,
  email,
  password,
  phone,
  address,
  hashedPassword,
  role,
  answer
) => {
  let user = null;
  try {
    user = await getDataFromDatabase(
      "sp_createNewUser",
      {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        saltpassword: hashedPassword,
        role: role,
        answer: answer,
      },
      {
        name: "text",
        email: "text",
        password: "text",
        phone: "text",
        address: "text",
        saltpassword: "text",
        role: "int",
        answer: "text",
      }
    );
  } catch (error) {
    console.log(`error in create User function in auth BAL ${error}`);
  }
  return user;
};

export const getUserByEmailId = async (email = "", id = 0) => {
  let user = null;
  try {
    user = await getDataFromDatabase(
      "sp_getUserByEmailId",
      { email: email, id: id },
      { email: "text", id: "int" }
    );
  } catch (error) {
    console.log(`error in user bal ${error}`);
  }
  return user;
};

export const UpdateForgotPassword = async (Id, hashedPassword, newPassword) => {
  let isUpdate = false;
  try {
    isUpdate = await getDataFromDatabase(
      "sp_ChangeUserPassword",
      {
        userId: Id,
        password: newPassword,
        saltPassword: hashedPassword,
      },
      {
        userId: "int",
        password: "text",
        saltPassword: "text",
      }
    );
  } catch (error) {
    console.log(
      `error in userBAL file in UpdateForgotPassword function ${error}`
    );
  }
  return isUpdate;
};
