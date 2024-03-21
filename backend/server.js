const express = require("express");
const { signUpValidation } = require("./type");
const { Users } = require("./db");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const signupPayload = req.body;

  const parsedPayload = signUpValidation.safeParse(signupPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ msg: "Invalid inputs try again" });
    return;
  } else {
    if (await Users.findOne({ username: parsedPayload.data.username })) {
      res.json({ msg: "User Exists already!" });
    } else {
      await Users.create({
        username: parsedPayload.data.username,
        password: parsedPayload.data.password,
        email: parsedPayload.data.email,
        name: parsedPayload.data.name,
      });
      res.json({ msg: "User Added" });
    }
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
