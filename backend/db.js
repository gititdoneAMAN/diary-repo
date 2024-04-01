const mongoose = require("mongoose");
const { date } = require("zod");

mongoose.connect(
  "mongodb+srv://AMAN:12345abcde.AMAN@cluster0.0vn5kfy.mongodb.net/Diary"
);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  diaryPage: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pages",
    },
  ],
});

const pageSchema = mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    default: new Date(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const validateSchema = mongoose.Schema({
  username: String,
  pageData: [
    {
      pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pages",
      },
      date: Date,
    },
  ],
});

const tokenSchema = mongoose.Schema({
  username: String,
  token: String,
});

const Validate = mongoose.model("Restriction", validateSchema);
const Users = mongoose.model("Users", userSchema);
const Pages = mongoose.model("Pages", pageSchema);
const Tokens = mongoose.model("Token", tokenSchema);

module.exports = {
  Users,
  Pages,
  Validate,
  Tokens,
};
