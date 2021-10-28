const { response } = require('express');
const Joi = require('joi'); 

async function validateFields(req, res = response, next) {
    const {name, price, quantity} = req.body;

    const product = Joi.object().keys({ 
        name: Joi.string().min(4).max(20).required(),
        price: Joi.string().min(3).max(6).required(),
        quantity: Joi.string().min(1).max(4).required()
    }); 

    const result = product.validate({name, price, quantity});
    const { error } = result;

    if (error == null) { 
        next();
    }else { 
        return res.status(422).json({ 
            ok: false,
            error: error.message
        });
    }
}

module.exports = {
    validateFields
}