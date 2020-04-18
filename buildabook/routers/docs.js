const Router = require('express').Router();
const mongoose = require('mongoose');
var schedule = require('node-schedule');
let Book = require('../models/book.model');
let Chapter = require('../models/chapter.model')

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Time to document that Express API you built",
        version: "1.0.0",
        description:
          "A test project to understand how easy it is to document and Express API",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        }
      },
      servers: [
        {
          url: "http://localhost:3000/api/"
        }
      ]
    },
    apis: ["./models/book.model.js", "./models/chapter.model.js", "./routers/bookAPI.js", "./routers/chapterAPI.js"]
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