const mongoose = require("mongoose");

mongoose.connect("");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Users = mongoose.model("Users", userSchema);
const Pages = mongoose.model("Pages", pageSchema);

module.exports = {
  Users,
  Pages,
};
