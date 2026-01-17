import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Validate middleware
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(422).json({ errors: errors.array() });
  };
};



// login validator
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Signup validator
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
  // body("email").trim().isEmail().withMessage("Valid email is required"),
  // body("password")
  //   .trim()
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long"),
];
