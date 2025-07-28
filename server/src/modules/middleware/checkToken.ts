import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: number;
  email: string;
  isAdmin: boolean;
  name: string;
}

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

const checkToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "noToken" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "noToken" });
      return;
    }
    // Attach the decoded token to the request object
    req.user = decoded as JWTPayload;
    console.log("Token is valid:", req.user);
    next();
  });
};

export default checkToken;
