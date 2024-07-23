const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "URL SHORTENING",
    version: "1.0.0",
    description: `The service let the customer to get a shorter url.\nFor example, the URL
                https://example.com/assets/category_B/subcategory_C/Foo/ can be shortened to
                https://example.com/Foo`,
  },
};

const options = {
  swaggerDefinition,
  //change the path?
  apis: ["../routes/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
