const path = require("path");
const express = require("express"); //here constant express variable is a function
const { get } = require("http");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
require("dotenv").config();
const app = express(); //generate the express application
const port = process.env.PORT || 3000;
//Paths for express config
const publicdir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs"); //setting a value for a setting ' ' - represenets key and value
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicdir));

app.get("", (req, res) => {
  //render for rendering the handle bars (index.hbs)
  res.render("index", {
    title: "Weather App",
    name: "Shivam",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    //render for about.hbs
    title: "About",
    name: "Shivam",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    //render for weather.hbs
    return res.send({
      error: "You mus provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastdata,
          location, //it can also be written as location:location
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/help", (req, res) => {
  res.render("help", {
    //will get rendered to help page (help.hbs)
    helpText: "This is some helpful text",
    title: "Help",
    name: "Shivam",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    //willg et rendered to 404 page (404.hbs)
    title: "404",
    name: "Shivam",
    errorMessage: "Page Not Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    //same as above
    title: "404",
    name: "Shivam",
    errorMessage: "Page Not Found",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
