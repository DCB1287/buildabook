const Router = require('express').Router();
const mongoose = require('mongoose');
var schedule = require('node-schedule');
let Book = require('../models/book.model');
let Chapter = require('../models/chapter.model')
let User = require('../models/user.model')

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "BuildaBook.Swagger",
        version: "1.0.0",
        description:
          "Documentation of APIs through swagger tools",
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        }
      },
      servers: [
        {
          url: "https://buildabook.herokuapp.com/api/"
        }
      ]
    },
    apis: ["./models/book.model.js", "./models/chapter.model.js", "./routers/bookAPI.js", "./routers/chapterAPI.js", "./routers/usersAPI.js", "./models/user.model.js"]
  };
  const specs = swaggerJsdoc(options);
  Router.use("/", swaggerUi.serve);
  Router.get(
    "/",
    swaggerUi.setup(specs, {
      explorer: true
    })
  );


  
module.exports = Router;