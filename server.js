//requiring dotenv
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ShortUrls = require('./models/shortUrl');
const app = express();


//Connection to DB
mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//sets template engine
app.set('view engine', 'ejs')

//tells to use static files
app.use(express.static('public'))
 
//makes it possible to use url params
app.use(express.urlencoded({ extended: false }))

//parses incoming JSON payload
app.use(express.json())


//Home Route
app.get('/',async (req, res)=>{
    const shortUrls = await ShortUrls.find({}).sort({_id:-1}).limit(1)
    res.render('index2',{ shortUrls : shortUrls})
})

//Docs route
app.get('/docs', (req, res) => {
    res.render('docs')
})

//API route
app.get("/shorten",async (req, res)=>{
    try{
        await ShortUrls.create({ full : req.query.url })
        const shortUrls = await ShortUrls.find({}).sort({_id:-1}).limit(1)
        res.status(200).json(`https://ab.cd/`+shortUrls[0].short)
    } catch (err) {
        res.status(400).json(err)
    }
})


app.post('/shortUrls',async (req, res)=>{
    await ShortUrls.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get("/:shortUrl",async (req, res) => {
    const shortUrl = await ShortUrls.findOne({ short : req.params.shortUrl })
    //Checking for valid data
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
} )


app.listen(process.env.PORT, ()=>{
    console.log("start")
})