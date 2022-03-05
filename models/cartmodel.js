const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    client: { type: String },
    total: { type: Number },
    products: [{
        product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        value: { type: Number },
        amount: { type: Number },
        condition: { type: Boolean }
    }],
}, {
    timestamps: true
});

//totalizar el carrito
cartSchema.statics.totalCart = function () {
    let total = 0;
    this.products.forEach(product => {
        total += product.value * product.amount;
    });
    this.total = total;
}

//agregar un producto al carrito
cartSchema.statics.addProduct = function (product, amount, price) {
    var productExist = false;
    console.log('product :', product);
    this.products.forEach(item => {
        if (item.product === product) {
            item.amount += amount;
            item.value = price;
            total = item.value * item.amount;
            productExist = true;
        }
    });
    if(!productExist){
        this.products.push({
            product: product,
            amount: amount,
            value: price,
            total: amount * price
        });
    }
}

//despues de guardar descontar el stock de cada item
cartSchema.statics.updateStock = function () {
    this.products.forEach(product => {
        Product.findById(product.product, (err, product) => {
            if (err) {
                console.log(err);
            } else {
                product.stock = product.stock - product.amount;
                product.save();
            }
        });
    });
}


module.exports = mongoose.model('cartmodel', cartSchema);

