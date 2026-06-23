import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserM, getUserByEmailM } from "../models/authModel.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await getUserByEmailM(email);
    if (existingUser) {
      throw new AppError("Email alredy in use", 400);
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUserM({
      username,
      email,
      password: hashedPassword,
     
    });

    const token = signToken(newUser.id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Please provide email and password", 400);
    }

    const user = await getUserByEmailM(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Incorrect email or password", 401);
    }
    const token = signToken(user.id);
    delete user.password;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];
    }


    if (!token) {
      throw new AppError(
        "You are not logged in! Please log in to get access.",
        401,
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    next();
  } catch (error) {

    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please log in again!", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError("Your token has expired! Please log in again.", 401),
      );
    }

    next(error);
  }
};
