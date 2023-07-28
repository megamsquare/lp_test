import { body, ValidationChain } from "express-validator";

export interface LoginInfo {
  username: string;
  password: string;
}

export interface AccessTokenCheck {
  header: string | undefined;
}

export const validateLogin: ValidationChain[] = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email or Username is required"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required"),
];

export const validateSignUp: ValidationChain[] = [
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
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required"),
];
