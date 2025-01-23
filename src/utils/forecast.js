const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0da713b47755d66b3ed65195391d4e20&query=${latitude},${longitude}`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect forecast service', undefined);
        } else if (!res?.body?.current) {
            callback('Unable to get forecast', undefined);
        } else {
            const { temperature, feelslike } = res.body.current
            callback(undefined, `It is currently ${temperature} degree out. If feels like ${feelslike} degree out`);
        }
    })
}

module.exports = forecast;