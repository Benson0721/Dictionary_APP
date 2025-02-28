import express from "express";
import { getFavorite } from "../apis/FavApis";


const router = express.Router();
router.get("/favorite", (req, res) => {
  getFavorite(req, res);
  console.log("route觸發");
});

router.post("/favorite", (req, res, next) => {
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
router.delete("/favorite", (req, res) => {
  //console.log(req)
  logout(req, res);
});

export { router };
