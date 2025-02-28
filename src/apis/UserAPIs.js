import { User } from "../models/UserSchema.js";
/*export const login = (req, res) => {
  res.send(req.user);
};*/

export const logout = (req, res) => {
  req.user = null;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("logout");
  });
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }
    console.log(req.body || "沒有收到資料");
    const newuser = new User({ username: username, email: email });
    const registeredUser = await User.register(newuser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.json(req.user);
    });
  } catch (error) {
    console.error("伺服器錯誤:", error.message);
    res.status(400).json({ error: error.message });
  }
};
