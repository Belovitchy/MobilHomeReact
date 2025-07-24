import type { RequestHandler } from "express";

// Import access to data
import OwnerRepository from "./ownerRepository";
const login: RequestHandler = async (req, res, next) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate the credentials using the repository
    const owner = await OwnerRepository.login(email, password);

    // If the owner is not found, respond with HTTP 401 (Unauthorized)
    if (!owner) {
      res.sendStatus(401);
      return;
    }

    // Respond with the owner's data in JSON format
    res.json(owner);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { login };
