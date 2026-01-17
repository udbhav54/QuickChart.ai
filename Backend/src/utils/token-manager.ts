import jwt from "jsonwebtoken";

export const createToken = (
  id: string,
  email: string,
  expiresIn: string
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn : "7d" });
};
