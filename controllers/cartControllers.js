var model = require("../models/cartModels");

async function createCart(req, res){
   
    const {cliente,total,producto:{nombre,valor,cantidad,descrpcion,estado }} = req.body;
    const newCart = new model({cliente,total,producto:{nombre,valor,cantidad,descrpcion,estado } });
    await newCart.save();
    return res.json("New Cart add succefull");     
};

async function getCart(req, res){
    try {
        const {idCart} = req.body;
        if(idCart){
            const cart = await model.findById(idCart);
            return res.json(cart);
        }else{
            //crear un nuevo carrito
            const cart = new model();
            cart.save();
            console.log(cart);
            return res.json(cart);
        }
    }
    catch (err) {
        //res.status(500).json({ error: err });
        console.log("Error of controlador getCart :" + err)
    }
};

async function getAllCarts(req, res){
    const carts = await model.find();
    return res.json(carts);
}

async function deleteCart(req, res){
    const ca = await model.findByIdAndRemove(req.params.id);
    return res.json("cart delete succefull" + ca);
};

module.exports = { createCart,getCart,deleteCart }