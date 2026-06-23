import {body} from "express-validator";



export const validateStudent = [
  body("first_name")
    .isString()
    .withMessage("First name must be a string")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be between 3 to 50 characters"),

  body("last_name")
    .isString()
    .withMessage("Last name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
     .isLength({ min: 3, max: 50 })
    .withMessage("Last name must be between 3 to 50 characters"),


  body("course")
    .notEmpty()
    .withMessage("Course can't be empty")
    .isInt({ min: 1, max: 4 })
    .withMessage("Course must be a number between 1 and 4"),

  body("subject_id")
    .notEmpty()
    .withMessage("Subject id can't be empty")
    .isInt({ min: 1 })
    .withMessage("Valid Subject ID is required"),

];