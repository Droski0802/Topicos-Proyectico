const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jokes API",
      version: "1.0.0",
      description: "API for creating and managing jokes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  //lugar donde va a buscar la documentacion
  apis: ["./swagger/*.yml"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
