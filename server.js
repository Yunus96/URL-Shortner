const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/shortUrls', (req, res)=>{
    
})

app.listen(process.env.PORT || 5001, ()=>{
    console.log("start")
})