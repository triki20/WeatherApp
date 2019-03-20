const request = require('request');

const forecast = (latitude, longitude, units, callback) => {
    const url = `https://api.darksky.net/forecast/47759c705f7491b296d12e55821075ae/${latitude},${longitude}?units=${units}`;
    
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined);
       } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            if(units === 'si'){
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature.toFixed(0)}C degress out. There is a ${body.currently.precipProbability}% chance of rain.`, body.daily.data[0].icon)   
            }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature.toFixed(0)}F degress out. There is a ${body.currently.precipProbability}% chance of rain.`, body.daily.data[0].icon)    
            }
        }
   });
}

module.exports = forecast;

 

