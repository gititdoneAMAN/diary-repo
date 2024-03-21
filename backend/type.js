const zod = require("zod");

const signUpValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email(),
  name: zod.string(),
});

module.exports = {
  signUpValidation,
};
