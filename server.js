const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Route file
const dentists = require("./routes/dentists");
const auth = require("./routes/auth");
const appointments = require("./routes/appointments");
const article = require("./routes/article");
const promotions = require("./routes/promotions");
const payments = require("./routes/payment");
const clinics = require("./routes/clinics");

connectDB();

const app = express();
//add cookie parser
app.use(cookieParser());

//Body parser
app.use(express.json());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());
//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 500,
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Body parser
app.use("/api/v1/dentists", dentists);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/article", article);
app.use("/api/v1/promotions", promotions);
app.use("/api/v1/payment", payments);
app.use("/api/v1/clinics", clinics);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Errow: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
