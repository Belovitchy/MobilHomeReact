import express from "express";
import checkToken from "./modules/middleware/checkToken";
import ownerActions from "./modules/owner/ownerActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

router.post("/api/owner", ownerActions.login);
router.get("/api/owner", checkToken, ownerActions.checkId);
router.patch("/api/owner/email/:id", checkToken, ownerActions.updateOwnerEmail);
router.get("/api/owner/booking/:id", checkToken, ownerActions.getOwnerBookings);
router.patch(
  "/api/owner/password/:id",
  checkToken,
  ownerActions.updateOwnerPassword,
);
router.get("/api/admin", checkToken, ownerActions.getOwners);
router.post("/api/owner/admin/owner", checkToken, ownerActions.addOwner);

export default router;
