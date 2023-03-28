const { not } = require("joi");
const Joi = require("joi");



exports.foodUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price:Joi.string().min(1).max(5).required(),
    bowls:Joi.string().min(1).max(4).required(),
    category_id:Joi.number().required(),
    food_img:Joi.object({
        type: Joi.string().valid("image/png", "image/jpeg" ),
      }).unknown(true),
});

exports.foodCreateSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price:Joi.string().min(1).max(5).required(),
    bowls:Joi.string().min(1).max(4).required(),
    category_id:Joi.number().required(),
    food_img:Joi.object({
        type: Joi.string().valid("image/png", "image/jpeg" ),
      }),
});

