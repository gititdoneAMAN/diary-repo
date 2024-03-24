const jwt = require("jsonwebtoken");
const { USers, Users } = require("./db");
const jwtpassword = "DiaryFullStack";

const UserMiddleware = async (req, res, next) => {
  const data = req.headers.authorization;
  const token = data.split(" ")[1];

  try {
    const username = jwt.verify(token, jwtpassword);
    const data = await Users.findOne({ username: username });
    const id = data._id;
    req.id = id;
    req.username = username;
    next();
  } catch (e) {
    res.json({ msg: "Invalid user credentials" });
  }
};

module.exports = {
  UserMiddleware,
  jwtpassword,
};
