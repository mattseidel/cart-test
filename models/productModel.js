const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, {
    timestamps: true
});

//validar que el stock sea mayor a 0
productSchema.methods.validateStock = function (amount) {
    return this.stock >= amount;
}

module.exports = mongoose.model('Product', productSchema);