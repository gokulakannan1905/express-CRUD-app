const mongoose = require('mongoose');
const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothes', 'Food', 'Books', 'Other']
    }
});

const Product = mongoose.model('Product', productScheme);
module.exports = Product;