import { Request } from "express";
import { body, ValidationChain } from "express-validator";

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export interface QueryUser {
    pageNumber: number;
    limitNumber: number;
}

export interface UserRequest extends Request {
  user?: { userId: string; role: string[] };
}

export const validateUpdate: ValidationChain[] = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name is required"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name is required"),
  body("email").trim().isEmail().withMessage("correct email is required"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required"),
];
