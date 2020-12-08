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

//tells to use static files
app.use(express.static('public'))
 
//makes it possible to use url params
app.use(express.urlencoded({ extended: false }))

//Home Route
app.get('/',async (req, res)=>{
    //const shortUrls = await ShortUrls.find()
    //,{ shortUrls : shortUrls}
    res.render('index2')
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

app.listen(process.env.PORT || 5001, ()=>{
    console.log("start")
})