const Product = require('./models/product');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.log('ERROR:', err.message);
});
const products = [
    {
        name: 'iPhone X',
        price: 999.99,
        category: 'Electronics'
    },
    {
        name: 'Macbook Pro',
        price: 1299.99,
        category: 'Electronics'
    },
    {
        name: 'Nike Shoes',
        price: 79.99,
        category: 'Clothes'
    },
    {
        name: 'Gucci Bag',
        price: 199.99,
        category: 'Clothes'
    },
    {
        name: 'Pizza',
        price: 5.99,
        category: 'Food'
    },
    {
        name: 'Coffee',
        price: 2.99,
        category: 'Food'
    },
    {
        name: 'The Bible',
        price: 9.99,
        category: 'Books'
    },
    {
        name: 'A Car',
        price: 19999.99,
        category: 'Other'
    }
];

Product.insertMany(products).then(() => {
    console.log('Inserted');
}).catch(err => {
    console.log('ERROR:', err.message);
});