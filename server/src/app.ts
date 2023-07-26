require("dotenv").config();
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import passport from "passport";
import { setupPassportStrategy } from "./configs/passport-strategy";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({ origin: [process.env.CLIENT_URL as string], credentials: true })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
setupPassportStrategy();

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running at http://localhost:" + process.env.PORT);
});
