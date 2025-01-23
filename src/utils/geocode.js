const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.positionstack.com/v1/forward?access_key=358704936d8b04a0695943e89703ecb2&query=${decodeURIComponent(address)}`;
    request({ url, json: true }, (errror, res) => {
        if (errror) {
            callback('Unable to connect location service', undefined)
        } else if (!res.body.data.length) {
            callback('Unable to find location', undefined);
        } else {
            const { longitude, latitude, name: location } = res.body.data[0];
            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }

    })
}

module.exports = geoCode;