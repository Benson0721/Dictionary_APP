import Joi from "joi";

const searchRule = Joi.object({
  word: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .required()
    .messages({
      "string.base": "Vocabulary must be a string",
      "string.empty": "You must type something to search vocabulary",
      "string.pattern.base":
        '"English" vocabulary must contain only "English" letters',
    }),
});

const RegisterRule = Joi.object({
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    .required()
    .min(3)
    .max(30)
    .messages({
      "string.base": "Please input valid email",
      "string.empty": "Please input your email",
      "string.pattern.base": "Email cannot contain special characters",
      "string.min": "Email must be at least {#limit} characters long",
      "string.max": "Email must be at most {#limit} characters long",
    }),
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .required()
    .min(5)
    .max(12)
    .messages({
      "string.base": "Username must contain only letters and numbers",
      "string.empty": "Please input your username",
      "string.pattern.base": "username must contain only letters and numbers",
      "string.min": "Username must be at least {#limit} characters long",
      "string.max": "Username must be at most {#limit} characters long",
    }),
  password: Joi.string()
    .min(8)
    .max(15)
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/
      )
    )
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password must be at most {#limit} characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

const LoginRule = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]+$"))
    .required()
    .min(5)
    .max(12)
    .messages({
      "string.base": "Username must contain only letters and numbers",
      "string.empty": "Please input your username",
      "string.pattern.base": "username must contain only letters and numbers",
      "string.min": "Username must be at least {#limit} characters long",
      "string.max": "Username must be at most {#limit} characters long",
    }),
  password: Joi.string()
    .min(8)
    .max(15)
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/
      )
    )
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least {#limit} characters long",
      "string.max": "Password must be at most {#limit} characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

export { searchRule, RegisterRule, LoginRule };
