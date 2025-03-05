import express from "express";
import { logout, register } from "../apis/UserAPIs.js";
import passport from "passport";

const router = express.Router();
router.post("/register", (req, res) => {
  register(req, res);
  console.log("route觸發");
});
/*router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    //console.log(req)
    login(req, res);
  }
);*/
router.post("/login", (req, res, next) => {
  console.log("login觸發");
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .json({ error: info.message || "Invalid credentails" });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      res.json(user);
    });
  })(req, res, next);
});
router.get("/logout", (req, res) => {
  //console.log(req)
  logout(req, res);
});

export { router };
