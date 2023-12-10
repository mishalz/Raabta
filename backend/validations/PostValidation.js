const joi = require("joi");

const postValidations = (postData) => {
  const postSchema = joi.object({
    title: joi.string().required(),
    topic: joi
      .array()
      .items(
        joi.string().valid("politics", "health", "sports", "tech").required()
      ) //topic is an array of strings, where each string can only be from the options: ["politics", "health", "sports", "tech"]
      .required(),
    message: joi.string().required(),
    author: joi.string().required(),
    expiration: joi.date().greater("now").required(), //the expiration date must be greater than the current date
  });
  return postSchema.validate(postData);
};
module.exports = postValidations;
