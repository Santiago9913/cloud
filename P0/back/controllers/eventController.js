const Prisma = require("../utils/dbHandler");
const authentication = require("../utils/authHandler");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Prisma.getEvent(req.params.id, req.user.id);

    if (event) {
      const deletedEvent = await Prisma.deleteEvent(event.id, event.ownerId);

      if (deletedEvent) {
        return res.status(200).json({
          status: "success",
          data: {
            message: "Event deleted successfully",
            deletedEvent,
          },
        });
      }
    }

    return res.status(400).json({
      status: "error",
      data: {
        message: "No event found",
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Prisma.getEvent(req.params.id, req.user.id);

    if (event) {
      return res.status(200).json({
        status: "success",
        data: {
          event,
        },
      });
    }

    return res.status(400).json({
      status: "error",
      data: {
        message: "No event found",
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Prisma.getEvents(req.user.id);

    if (events) {
      return res.status(200).json({
        status: "success",
        data: {
          events,
        },
      });
    }

    return res.status(400).json({
      status: "error",
      data: {
        message: "No events found",
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.place ||
      !req.body.address ||
      !req.body.startDate ||
      !req.body.endDate ||
      req.body.isVirtual === undefined ||
      req.body.isVirtual === null
    ) {
      return res.status(400).json({
        status: "error",
        data: {
          message: "Please provide all required fields",
        },
      });
    }

    const user = await Prisma.getUserById(req.user.id);

    const id = uuidv4();
    const event = {
      id: id,
      name: req.body.name,
      category: req.body.category,
      place: req.body.place,
      address: req.body.address,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      isVirtual: req.body.isVirtual,
      owner: user,
      ownerId: req.user.id,
    };

    const dbEvent = await Prisma.createEvent(event);

    if (dbEvent) {
      return res.status(200).json({
        status: "success",
        data: {
          event: {
            id: dbEvent.id,
            name: dbEvent.name,
            category: dbEvent.category,
            place: dbEvent.place,
            address: dbEvent.address,
            startDate: dbEvent.startDate,
            endDate: dbEvent.endDate,
            isVirtual: dbEvent.isVirtual,
            owner: dbEvent.owner,
            ownerId: dbEvent.ownerId,
          },
        },
      });
    }

    return res.status(400).json({
      status: "error",
      data: {
        message: "Please provide all required fields",
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Prisma.getEvent(req.params.id, req.user.id);

    if (event) {
      const updatedEvent = await Prisma.updateEvent(
        req.params.id,
        req.user.id,
        req.body
      );

      if (updatedEvent) {
        return res.status(200).json({
          status: "success",
          data: {
            message: "Event updated successfully",
            updatedEvent,
          },
        });
      }
    }

    return res.status(400).json({
      status: "error",
      data: {
        message: "No event found",
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};
