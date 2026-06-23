import { body } from "express-validator";

export const validateSubject = [
  body("name")
    .isString()
    .withMessage("Subject name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Subject name must be between 3 and 100 characters"),

  body("credits")
     .notEmpty()
    .withMessage("Credits is required")
    .isInt({ min: 1 })
    .withMessage("Credits must be a positive whole number"),

];