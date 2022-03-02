var model = require("../models/cartModels");

async function createCart(req, res){
   
    const {cliente,total,producto:{nombre,valor,cantidad,descrpcion,estado }} = req.body;
    const newCart = new model({cliente,total,producto:{nombre,valor,cantidad,descrpcion,estado } });
    await newCart.save();
    return res.json("New Cart add succefull");     
};

async function getCart(req, res){

    try {
        const ca = await model.find();
        console.log(res);
        return res.json(ca);
       
    }
    catch (err) {
        //res.status(500).json({ error: err });
        console.log("Error of controlador getCart :" + err)
    }
};

async function deleteCart(req, res){
    const ca = await model.findByIdAndRemove(req.params.id);
    return res.json("cart delete succefull" + ca);
};

module.exports = { createCart,getCart,deleteCart }