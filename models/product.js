const Joi = require('joi'); 

const product = Joi.object().keys({ 
    name: Joi.string().min(4).max(20).required(),
    price: Joi.string().min(3).max(6).required(),
    quantity: Joi.string().min(1).max(4).required()
}); 

module.exports = product;


