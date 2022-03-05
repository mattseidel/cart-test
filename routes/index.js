const express = require('express');
// const { getCart } = require('../contollers/cartControllers');
var router = express.Router();
var model = require("../models/cartmodel");


// Getting all
router.get('/', getCart)
// Getting One
// router.get('/search/:id', getCart, async (req, res) => {
//     await res.json(res.model)
// })

router.post('/addItemsToCart', addItemsToCart);

// Creating one
router.post('/', async (req, res) => {
    try {
        console.log('entre al metodo', req.body);

        const { code, client, total, product: { name, value, amount, description, condition } } = req.body;
        const newCart = new model({ code, client, total, product: { name, value, amount, description, condition } });

        await newCart.save();
        return res.json("New Cart add", newCart);
    } catch (error) {
        console.log('error :', error);

        res.status(500).json({ message: error.message })
    }
})
// Updating One
router.patch('/:id', getCart, async (req, res) => {
    if (req.body.id !== null) {
        res.model.id = req.body.id
    }
    if (req.body.id !== null) {
        res.model.id = req.body.id
    }
    try {
        const updateCart = await res.model.save()
        res.json(updateCart)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Deleting One
router.delete('/delete/:id', async (req, res) => {
    try {
        const cart = await model.findByIdAndRemove(req.params.id);
        if (cart) return res.json("Cart delete" + cart);
        else return res.json("Cart delete not found " + cart);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function obtenerCarritos(idCart){
    if(idCart){
        const cart = await model.findById(idCart);
        return {
            response: 200,
            cart
        };
    }else{
        //crear un nuevo carrito
        const cart = new model();
        await cart.save();
        return {
            response: 200,
            cart
        };
    }
}

async function getCart(req, res){
    try {
        const {idCart} = req.body;
        res.json(await obtenerCarritos(idCart));
    }
    catch (err) {
        //res.status(500).json({ error: err });
        console.log("Error of controlador getCart :" + err)
    }
};

async function addItemsToCart(req,res){
    try{
        const {idCart, product, amount, price} = req.body;
        const cart = await obtenerCarritos(idCart);
        var productExist = false;
        cart.products.forEach(item => {
            if (item.product === product) {
                item.amount += amount;
                item.value = price;
                total = item.value * item.amount;
                productExist = true;
            }
        });
        
        if (!productExist) {
            cart.products.push({
                product: product,
                amount: amount,
                value: price,
                total: amount * price
            });
        }
        await cart.save()
        return res.json({
            response:200,
            cart
        }); 
    }catch(e){

    }
}


module.exports = router;
