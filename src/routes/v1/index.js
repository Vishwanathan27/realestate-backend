const express = require('express');
const { validateToken } = require("@auth");

const miscRouter = require("./misc");
const authRouter = require("./auth");
const userRouter = require("./user");
const propertyRouter = require("./property");

const publicRouter = express.Router();
const privateRouter = express.Router();

// Public routes
publicRouter.use("/misc", miscRouter);
publicRouter.use("/auth", authRouter);
publicRouter.use("/user", userRouter);

// Private routes
privateRouter.use("/properties", propertyRouter);

const router = express.Router();

router.use("/public", publicRouter);
router.use("/private", validateToken, privateRouter);

module.exports = router;
