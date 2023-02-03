const Prisma = require("../utils/dbHandler");
const authentication = require("../utils/authHandler");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "error",
        data: {
          message: "Please provide all required fields",
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        data: {
          message: errors.array()[0].msg,
        },
      });
    }

    const id = uuidv4();
    const hash = await authentication.hashPassword(req.body.password);
    const user = {
      id: id,
      name: req.body.name,
      email: req.body.email,
      password: hash,
      events: {},
    };
    const dbUser = await Prisma.createUser(req.body.email, user);

    if (dbUser) {
      const token = authentication.generateToken(dbUser);
      return res.status(200).json({
        status: "success",
        data: {
          user: {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
          },
          token: token,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: {
          message: "User already exists",
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "error",
        data: {
          message: "Please provide all required fields",
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        data: {
          message: errors.array()[0].msg,
        },
      });
    }

    const dbUser = await Prisma.getUserByEmail(req.body.email);
    const isCorectPassword = await authentication.comparePassword(
      req.body.password,
      dbUser.password
    );

    if (!isCorectPassword) {
      return res.status(400).json({
        status: "error",
        data: {
          message: "Incorrect password",
        },
      });
    }

    if (dbUser) {
      const token = authentication.generateToken(dbUser);
      return res.status(200).json({
        status: "success",
        data: {
          user: {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
          },
          token: token,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        data: {
          message: "User does not exist",
        },
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      data: {
        message: e.message,
      },
    });
  }
};
