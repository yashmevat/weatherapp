const { name } = require("ejs");
const express = require("express")
const axios = require('axios')
const path = require('path')
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'))
const PORT = process.env.PORT || 3500

app.get('/',(req,res)=>{
    res.render("index",{weather:null,error:null})
})

app.get('/show',async(req,res)=>{
    const city = req.query.city
    const apikey='184f08896c88b55a21d1fa530d18288c'
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    let weather;
    let error=null;
    try {
    const response = await axios.get(url)
    weather=response.data
  } catch (e) {
    weather=null;
    error="try again got an error!"
  }
  res.render("index",{weather,error,city})
})
app.listen(PORT,()=>{
    console.log("listening on port",PORT)
})