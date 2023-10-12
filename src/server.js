const express = require("express");

const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

// Helmet
app.use(helmet());

// Protect against XSS attacks, should come before any routes
app.use(xssClean());

// Restrict all routes to only 50 requests per IP address every minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // 50 requests per IP
});
app.use(limiter);

// enable cors
app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(`Unknown request path: ${req.path}`);
  next(new ApiError(404, "Not found"));
});

module.exports = app;
