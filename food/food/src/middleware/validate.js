const { 
    foodUpdateSchema,
    foodCreateSchema
} = require("../lib/joi");

const validateUpdateFood = (req, res, next) => {
    const data = foodUpdateSchema.validate(req.body, req.files);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
};

const validateCreateFood = (req,res,next) => {
    const data = foodCreateSchema.validate(req.body , req.files);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
}



module.exports = {
    validateUpdateFood,
    validateCreateFood
}