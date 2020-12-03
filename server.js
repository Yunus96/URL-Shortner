const express = require('express');
const mongoose = require('mongoose')
//importing db models
const shortUrls = require('./models/shortUrl')
const app = express();

mongoose.connect('mongodb:localhost/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//sets template engine
app.set('view engine', 'ejs')
 
//makes it possible to use url params
app.use(express.urlencoded({ extended: false }))

//
app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/shortUrls',async (req, res)=>{
    await shortUrls.create({ full: req.body.fullUrl })
    console;
    res.redirect('/')
})

app.listen(process.env.PORT || 5001, ()=>{
    console.log("start")
})