const zod = require("zod");

const signUpValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email(),
  name: zod.string(),
});

const signInValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
});

module.exports = {
  signUpValidation,
  signInValidation,
};
