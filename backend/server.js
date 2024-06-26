const express = require("express");
const {
  signUpValidation,
  signInValidation,
  mainPageValidation,
} = require("./type");
const { Users, Pages, Validate, Tokens } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  UserMiddleware,
  jwtpassword,
  PageMiddleware,
  ValidateMiddleware,
} = require("./middleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// SignIn route

app.post("/signin", async (req, res) => {
  const signinPayload = req.body;
  const parsedPayload = signInValidation.safeParse(signinPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ msg: "Invalid Input" });
    return;
  } else {
    const data = await Users.findOne({ username: parsedPayload.data.username });

    if (data) {
      const token = jwt.sign(parsedPayload.data.username, jwtpassword);
      await Tokens.create({
        username: parsedPayload.data.username,
        token: `Bearer ${token}`,
      });
      if (await bcrypt.compare(parsedPayload.data.password, data.password)) {
        res.json({
          msg: "Success",
          token: `Bearer ${token}`,
        });
      }
    } else {
      res.json({ msg: "You are not a user yet! SignUp first!" });
    }
  }
});

// Tokens

app.get("/getToken", async (req, res) => {
  try {
    const username = req.headers.username;
    console.log(username);

    const data = await Tokens.findOne({ username: username });
    console.log(data);
    console.log(data.token);
    const token = data.token;

    res.send(token);
  } catch (e) {
    console.log("Error in the getToken route");
  }
});

// Signup Route

app.post("/signup", async (req, res) => {
  const signupPayload = req.body;

  const parsedPayload = signUpValidation.safeParse(signupPayload);
  const hashedPassword = await bcrypt.hash(parsedPayload.data.password, 10);

  try {
    if (!parsedPayload.success) {
      res.status(411).json({ msg: "Invalid inputs try again" });
      return;
    } else {
      if (await Users.findOne({ username: parsedPayload.data.username })) {
        res.json({ msg: "User Exists already!" });
      } else {
        await Users.create({
          username: parsedPayload.data.username,
          password: hashedPassword,
          email: parsedPayload.data.email,
          name: parsedPayload.data.name,
        });
        res.json({ msg: "User Added" });
      }
    }
  } catch (e) {
    res.json("There is a error in the signup route");
  }
});

// Main page routes

app.get("/userData", UserMiddleware, async (req, res) => {
  console.log(req.username);
  const data = await Users.findOne({ username: req.username });
  const pageArray = data.diaryPage;
  const pageArrayData = [];

  for (let i = pageArray.length - 1; i >= 0; i--) {
    const pageData = await Pages.findOne({ _id: pageArray[i] });
    const pageId = pageData._id;
    const objData = {
      title: pageData.title,
      description: pageData.description,
      date: pageData.date,
      id: i,
      pageId: pageId,
    };
    pageArrayData.push(objData);
  }

  console.log(pageArrayData);

  res.json({
    msg: "Success",
    content: pageArrayData,
  });
});

app.post(
  "/createMainPage",
  UserMiddleware,
  ValidateMiddleware,
  async (req, res) => {
    try {
      const mainPagePayload = req.body;
      const parsedPayload = mainPageValidation.safeParse(mainPagePayload);
      if (!parsedPayload.success) {
        res.status(411).json({ msg: "Invalid main page input" });
        return;
      } else {
        const data = await Pages.create({
          title: parsedPayload.data.title,
          description: parsedPayload.data.description,
          owner: req.id,
        });
        const value = { pageId: data._id, date: data.date };
        console.log(data.date);

        const checkValid = await Validate.findOne({ username: req.username });

        if (checkValid == null) {
          await Validate.create({
            username: req.username,
          });
        }

        await Validate.updateOne(
          { username: req.username },
          {
            $push: { pageData: value },
          }
        );

        await Users.updateOne(
          { username: req.username },
          {
            $push: { diaryPage: data._id },
          }
        );
        res.json({ msg: "Page Added Successfully" });
      }
    } catch (e) {
      res.send("Error in the createMainPage route");
    }
  }
);

// Whenever the user will try to update something to the already added page then
//*User sends the page's object id through body
//  Check will be made whether it is being on done on the same date or not
//  If it is the same date then the addition is allowed
//  If date is not same it's not allowed
//Will implement the date checking using a middleware

app.post(
  "/updateMainPage",
  UserMiddleware,
  PageMiddleware,
  async (req, res) => {
    try {
      await Pages.updateOne(
        { _id: req.body.id },
        {
          title: req.body.title,
          description: req.body.description,
        }
      );
      res.json({ msg: "Data updated successfully!" });
    } catch (e) {
      res.json({ msg: "Error in the page middleware" });
    }
  }
);

// Delete Route
// Allows to delete the pages from the diary.
// MAde change will be visible in Restriction,User,Pages tables and it will be deleted from them

app.delete("/deletePage", UserMiddleware, async (req, res) => {
  try {
    const id = req.body.id;
    await Pages.deleteOne({ _id: id });

    const restrictedData = await Validate.findOne({ username: req.username });
    const userData = await Users.findOne({ username: req.username });
    const arrRestrictedData = [];
    const arrUserData = [];

    if (restrictedData) {
      restrictedData.pageData.map((i) => {
        if (!(i.pageId == id)) {
          arrRestrictedData.push(i);
        }
      });

      await Validate.updateOne(
        { username: req.username },
        {
          $set: { pageData: arrRestrictedData },
        }
      );
    }

    if (userData) {
      userData.diaryPage.map((i) => {
        if (!(i == id)) {
          arrUserData.push(i);
        }
      });
      await Users.updateOne(
        { username: req.username },
        {
          $set: { diaryPage: arrUserData },
        }
      );
    }

    res.json({ msg: "Page deleted successfully" });
  } catch (e) {
    res.json({ msg: "error in the delete route" });
  }
});

app.get("/logout", UserMiddleware, async (req, res) => {
  try {
    await Tokens.deleteOne({ username: req.username });
    res.json({ msg: "Logged out successfully" });
  } catch (e) {
    res.json({ msg: "Logged out unsuccessful" });
  }
});

app.post("/getPageData", UserMiddleware, async (req, res) => {
  const pageInfo = await Pages.findOne({ _id: req.body.id });

  res.json({
    title: pageInfo.title,
    description: pageInfo.description,
    name: req.username,
    date: pageInfo.date,
    msg: "success",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

function globalCatch(error, req, res, next) {
  if (error) {
    res.json({ msg: "There is an error in the backend" });
  }
}
