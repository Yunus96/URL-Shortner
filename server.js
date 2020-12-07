const express = require('express');
const mongoose = require('mongoose');
const shortUrls = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//sets template engine
app.set('view engine', 'ejs')
 
//makes it possible to use url params
app.use(express.urlencoded({ extended: false }))

//
app.get('/',async (req, res)=>{
    await shortUrls.find()
    res.render('index', {shortUrls : shortUrl})
})


app.post('/shortUrls',async (req, res)=>{
    await shortUrls.create({ full: req.body.fullUrl })
    console;
    res.redirect('/')
})

app.listen(process.env.PORT || 5001, ()=>{
    console.log("start")
})