const express = require('express');
var router = express.Router();
var model = require("../models/cartmodel");


// Getting all
router.get('/', async (req, res) => {
    try {
        const cart = await model.find()
        console.log('respuesta :', cart);
        return res.send(cart)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Getting One
router.get('/search/:id', getCart, async (req, res) => {
    await res.json(res.model)
})

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

async function getCart(req, res) {

    let cart;
    try {
        cart = await model.findById(req.params.id)
        if (cart == null) { return res.status(404).json({ message: 'Cannot find cart' }) }
        else return res.json(cart)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

module.exports = router;
