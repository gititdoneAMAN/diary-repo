const express = require("express");
const { signUpValidation, signInValidation } = require("./type");
const { Users } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtpassword = "DiaryFullStack";

const app = express();
app.use(express.json());

// SignIn route

app.post("/signin", async (req, res) => {
  const signinPayload = req.body;
  const parsedPayload = signInValidation.safeParse(signinPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ msg: "Invalid Input" });
    return;
  } else {
    const data = await Users.findOne({ username: parsedPayload.data.username });
    console.log(data);
    if (data) {
      const token = jwt.sign(parsedPayload.data.username, jwtpassword);
      if (await bcrypt.compare(parsedPayload.data.password, data.password)) {
        res.json({
          msg: "Success",
          token: `Bearer ${token}`,
        });
      }
    }
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
    res.send("There is a error in the signup route");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
