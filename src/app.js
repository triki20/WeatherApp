const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../tamplates/views');
const partialsPath = path.join(__dirname, '../tamplates/partials');

// Setup hendlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yahalom Triki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yahalom Triki'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'How can i help u?',
        name: 'Yahalom Triki'
    })
})

app.get('/weather' , (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an adress'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error});
        }
       
        forecast(latitude, longitude, req.query.units, (error, forecastData , icon) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                units: req.query.units,
                icon
            });
        });
    }); 
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help page',
        errorMessage: 'Help artical not found.',
        name: 'Yahalom Triki'
    })
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Yahalom Triki'
    })
});



app.listen(port, () => {
    console.log(`Server listen to port ${port}`);
});