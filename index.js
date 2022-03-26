// imports 
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Farm = require('./models/farm');


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//starting the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
    });

// Database
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.log('ERROR:', err.message);
});

//constants
const categories = ['Electronics', 'Clothes', 'Food', 'Books', 'Other'];

// farm routes
app.get('/farms',async (req, res) => {
    const farms = await Farm.find();
    res.render('farms/index', { farms }); 
});
app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
});
app.get('/farms/:id',async (req,res)=>{
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
});
app.post('/farms',async (req,res)=>{
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
});
app.get('/farms/:id/products/new',async (req,res)=>{
    const { id } = req.params;
    const {name} = await Farm.findById(id);
    res.render('products/new', { categories,id,name});
});
app.post('/farms/:id/products',async (req,res)=>{
    const { id } = req.params;
    const  farm = await Farm.findById(id);
    const product = new Product(req.body);
    farm.products.push(product);
    await farm.save();
    product.farm = farm;
    await product.save();
    res.redirect(`/farms/${farm._id}`);
});
app.delete('/farms/:id',async (req,res)=>{
    await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
});



// product routes
app.get('/',(req,res)=>{
    res.render('root');
})
app.get('/test',(req,res)=>{    // absolute path
    res.render('test/test.ejs'); // relative path
})
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category){
        const products = await Product.find({category});
        res.render('products/index', { products,category }); 
    }
    else{
        const products = await Product.find();
        res.render('products/index', { products,category:'All' });
    }    
});

app.get('/product/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('farm','name');
    res.render('products/show',{product});
});
app.get('/product/new',(req,res)=>{
    res.render('products/new',{categories});
});
app.get('/product/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product,categories });
});
app.post('/product', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
});
app.put('/product/:id',async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    res.redirect(`/product/${id}`);    
});
app.delete('/product/:id',async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


