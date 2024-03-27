import Jwt from "jsonwebtoken";
import { getUserByEmailId } from "../dbContext/UserBAL.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(`error in auth middleware ${error}`);
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await getUserByEmailId("", req.user.id);
  if (user.Role !== 1) {
    return res.send({
      success: false,
      message: "UnAuthorize Access",
    });
  } else {
    next();
  }
};
