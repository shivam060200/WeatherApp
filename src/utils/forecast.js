const request = require("request");
require("dotenv").config();
const forecast = (long, lat, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    encodeURIComponent(lat) +
    "&" +
    "lon=" +
    encodeURIComponent(long) +
    "&appid=" +
    process.env.API_KEY2;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect!", undefined);
    } else if (body.cod === 400) {
      callback("Wrong longitude and latitude", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temp,
        humidity: body.current.humidity,
      });
    }
  });
};
module.exports = forecast;
