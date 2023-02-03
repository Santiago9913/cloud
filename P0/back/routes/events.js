const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.post(
  "/create",
  authController.authenticateToken,
  eventController.createEvent
);

router.get("/all", authController.authenticateToken, eventController.getEvents);
router.get("/:id", authController.authenticateToken, eventController.getEvent);
router.delete(
  "/:id",
  authController.authenticateToken,
  eventController.deleteEvent
);
router.put(
  "/:id",
  authController.authenticateToken,
  eventController.updateEvent
);

module.exports = router;
