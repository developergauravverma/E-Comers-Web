import { comparePassword, hashPassword } from "../Helper/AuthHelper.js";
import {
  isEmailExists,
  createNewUser,
  getUserByEmailId,
  UpdateForgotPassword,
} from "../dbContext/UserBAL.js";
import Jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is Requires" });
    }
    if (!email) {
      return res.send({ message: "Email is Requires" });
    }
    if (!password) {
      return res.send({ message: "Password is Requires" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Requires" });
    }
    if (!address) {
      return res.send({ message: "Address is Requires" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Requires" });
    }
    const exisitingUser = await isEmailExists(email);
    if (exisitingUser.isEmailExists) {
      return res.send({
        success: false,
        message: "this user is exists",
      });
    }
    const hashedPassword = await hashPassword(password);

    const role = 0;

    const user = await createNewUser(
      name,
      email,
      password,
      phone,
      address,
      hashedPassword,
      role,
      answer
    );
    return res.send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(`error in register controller ${error}`);
    res.send({
      success: false,
      message: "something went wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({ message: "Email is Requires" });
    }
    if (!password) {
      return res.send({ message: "Password is Requires" });
    }
    const user = await getUserByEmailId(email);
    if (!user) {
      return res.send({
        success: true,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.SaltPassword);
    if (!match) {
      return res.send({
        success: true,
        message: "Invalid UserName or Password",
      });
    }
    const token = await Jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.send({
      success: true,
      message: "login successfully",
      user: {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        phone: user.Phone,
        address: user.Address,
        role: user.Role,
      },
      token,
    });
  } catch (error) {
    console.log(`error in login controller ${error}`);
    return res.send({
      success: false,
      message: "some thing went wrong",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) return res.send({ message: "Email field can't be empty" });
    if (!answer) return res.send({ message: "Answer field can't be empty" });
    if (!newPassword)
      return res.send({ message: "New Password field can't be empty" });

    const user = await getUserByEmailId(email);
    if (!user) {
      return res.send({
        success: true,
        message: "Email is not register",
      });
    }

    if (answer !== user.Answer) {
      return res.send({
        success: false,
        message: "Answer is wrong Please Try again",
      });
    }

    const isPasswordSame = await comparePassword(
      newPassword,
      user.SaltPassword
    );

    if (isPasswordSame) {
      return res.send({
        success: false,
        message: "You are using current password as a new password.",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    const update = await UpdateForgotPassword(
      user.Id,
      hashedPassword,
      newPassword
    );
    if (!update) {
      return res.send({
        success: false,
        message: "Something went wrong because password is not updated",
      });
    }
    return res.send({
      success: true,
      message: "Password is Updated",
    });
  } catch (error) {
    console.log(`error in forgot controller ${error}`);
    return res.send({
      success: false,
      message: "something went wrong",
    });
  }
};

export const testController = async (req, res) => {
  return res.send({
    success: true,
    message: "middleware work properly",
  });
};
