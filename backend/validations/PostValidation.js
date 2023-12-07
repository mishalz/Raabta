const joi = require("joi");

const postValidations = (postData) => {
  const postSchema = joi.object({
    title: joi.string().required(),
    topic: joi
      .array()
      .items(joi.string().valid("politics", "health", "sports", "tech"))
      .required(),
    message: joi.string().required(),
    expiration: joi.date().greater("now").required(),
  });
  return postSchema.validate(postData);
};
module.exports = postValidations;
