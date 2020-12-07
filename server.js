const express = require('express');
const mongoose = require('mongoose');
const ShortUrls = require('./models/shortUrl');
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
    await ShortUrls.find()
    res.render('index', {ShortUrls : ShortUrls})
})


app.post('/shortUrls',async (req, res)=>{
    await ShortUrls.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.listen(process.env.PORT || 5001, ()=>{
    console.log("start")
})