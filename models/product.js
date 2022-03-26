const mongoose = require('mongoose');
const { Schema } = mongoose;
const productScheme = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    },
    farm:{
        type : Schema.Types.ObjectId,
        ref : 'Farm'
    }
});

const Product = mongoose.model('Product', productScheme);
module.exports = Product;