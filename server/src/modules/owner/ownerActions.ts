import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ical from "node-ical";

// Import access to data
import OwnerRepository from "./ownerRepository";
const login: RequestHandler = async (req, res, next) => {
  try {
    const owner = await OwnerRepository.login(req.body.email);
    if (!owner) {
      res.sendStatus(401);
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      owner.password,
    );
    if (!isPasswordValid) {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign(
      { id: owner.id, email: owner.email, isAdmin: owner.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      token,
      owner: {
        id: owner.id,
        name: owner.name,
        isAdmin: owner.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const checkId: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      res.sendStatus(401);
      return;
    }
    const owner = await OwnerRepository.checkId(req.user.id);
    if (!owner) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      owner: {
        id: owner.id,
        name: owner.name,
        isAdmin: owner.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateOwnerEmail: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!req.user || !req.user.id) {
      res.sendStatus(403);
      return;
    }

    const updatedOwner = await OwnerRepository.updateEmail(id, email);
    if (!updatedOwner) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({
      owner: {
        id: updatedOwner.id,
        name: updatedOwner.name,
        isAdmin: updatedOwner.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getOwnerBookings: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      res.sendStatus(403);
      return;
    }

    // Assuming there's a method to get bookings by owner ID
    const response = await fetch(
      "https://ical.booking.com/v1/export?t=fe398f8f-fbd4-4f23-a673-c094fb522533",
    );
    if (!response) {
      res.sendStatus(404);
      return;
    }

    const icsText = await response.text();

    // Parser le .ics
    const parsed = ical.parseICS(icsText);

    // On filtre et transforme les événements utiles
    const bookings = Object.values(parsed)
      .filter((event: ical.CalendarComponent) => event.type === "VEVENT")
      .map((event: ical.CalendarComponent) => {
        if (event.type !== "VEVENT") {
          throw new Error("Expected a VEvent");
        }
        return {
          start: event.start.toLocaleDateString("fr-FR"),
          end: event.end.toLocaleDateString("fr-FR"),
          summary: event.summary,
        };
      });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

const updateOwnerPassword: RequestHandler = async (req, res, next) => {
  //mise en place du hachage pour le mot de passe
};

const getOwners: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.sendStatus(403);
      return;
    }
    const owners = await OwnerRepository.getOwners();
    res.status(200).json(owners);
  } catch (err) {
    next(err);
  }
};

const addOwner: RequestHandler = async (req, res, next) => {
  try {
    if (req.user && !req.user.isAdmin) {
      console.log("tu n'es pas admin");
      return;
    }
    const passHash = await bcrypt.hash(req.body.password, 10);
    const newOwner = await OwnerRepository.addOwner(
      req.body.email,
      passHash,
      req.body.name,
      req.body.isAdmin,
    );
    res.status(201).json(newOwner);
    console.log("req.body:", req.body);
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  checkId,
  updateOwnerEmail,
  getOwnerBookings,
  updateOwnerPassword,
  getOwners,
  addOwner,
};
