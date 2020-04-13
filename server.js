if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_KEY1 = "379ff71d2cce480ab3d213f056a81783"
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${req.body.latitudes}&lon=${req.body.longitude}&key=${WEATHER_API_KEY1}`
    //const url = `api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${OPENWEATHER_API_KEY}`
    
    //url.then(data => res.json(data.data))

    axios({
        url:url,
        responseType: 'json'
    }).then(data => res.json(data.data))


})

app.listen(3000, () => {
    console.log('Server Started')
})