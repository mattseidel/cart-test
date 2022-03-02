const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    code: { type: String, required: true },
    client: { type: String, required: true },
    total: { type: Number, required: true },
    product: {
        name: { type: String },
        value: { type: Number, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        condition: { type: Boolean, required: true }
    },


}, {
    timestamps: true

});
module.exports = mongoose.model('cartmodel', cartSchema);

