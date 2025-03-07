import mongoose from "mongoose";
import { User } from "./src/models/UserSchema.js";
import { router as UserRoutes } from "./src/routes/UserRoutes.js";
import { router as FavRoutes } from "./src/routes/FavRoutes.js";
import passport from "passport";
import express from "express";
import LocalStrategy from "passport-local";
import session from "express-session";
import MongoStore from "connect-mongo";
const DBURL = "mongodb://127.0.0.1:27017/dictionary";

const connectToDB = async () => {
  try {
    mongoose.connect(DBURL);
    console.log("connection successful");
  } catch (err) {
    console.error(err);
  }
};

connectToDB();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const store = MongoStore.create({
  mongoUrl: DBURL,
  collectionName: "sessions",
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
}); // use for logginger)

const app = express();
const port = 5000;
const sessionConfig = {
  store,
  name: "session",
  secret: "thisismysecert",
  resave: false,
  saveUninitialized: false, // 這樣 passport 只會在登入後儲存 session
  unset: "destroy",
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig)); //開啟session儲存登入狀態

app.use(passport.initialize()); //啟動passport功能
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", UserRoutes);
app.use("/", FavRoutes);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

app.on("error", (err) => {
  console.error("Server error:", err);
});
