const jwt = require("jsonwebtoken");
const { Pages, Users, Validate } = require("./db");
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

const PageMiddleware = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = await Pages.findOne({ _id: id });
    console.log(data);
    const createdDate = data.date;
    const currentDate = new Date();

    if (
      createdDate.getDate() != currentDate.getDate() ||
      createdDate.getMonth() != currentDate.getMonth() ||
      createdDate.getMonth() != currentDate.getMonth()
    ) {
      res.json({ msg: "Date has passed you cannot re-edit it" });
    } else {
      next();
    }
  } catch (e) {
    res.send("Error in the page middleware");
  }
};

const ValidateMiddleware = async (req, res, next) => {
  const data = await Validate.findOne({ username: req.username });
  const currentDate = new Date();
  if (!data) {
    next();
    return;
  } else {
    data.pageData.map((i) => {
      if (i.date.getDate() == currentDate.getDate()) {
        res.send(
          "Only one page can be created on a date! Reedit the previous entry"
        );
      } else {
        res.send("Done");
      }
    });
  }
};

module.exports = {
  ValidateMiddleware,
  UserMiddleware,
  PageMiddleware,
  jwtpassword,
};
