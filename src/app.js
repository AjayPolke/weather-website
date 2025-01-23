const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const templatesDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setupd handlerbars engine and views
app.set('view engine', 'hbs');
app.set('views', templatesDir);
hbs.registerPartials(partialsDir);

// setup static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ajay Polke',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query?.address) {
        return res.send({
            error: 'Address is required'
        })
    }

    geoCode(req.query.address, (err, { longitude, latitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ajay Polke'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ajay Polke',
        msg: 'Do you need some help ?',
    })
})


app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Help Article',
        name: 'Ajay Polke',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        name: 'Ajay Polke',
        error: '404! Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Listening to port 3000')
})