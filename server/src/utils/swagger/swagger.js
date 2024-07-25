const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "URL SHORTENING",
    version: "1.0.0",
    description: `The service let the customer to get a shorter url. For example, the URL
                https://example.com/assets/category_B/subcategory_C/Foo/ can be shortened to
                https://example.com/Foo`,
  },
  host: "localhost:8080",
  schemes: ["http"],
  tags: [
    {
      name: "URL",
    },
  ],
  components: {
    schemas: {
      urlSchema: {
        type: "object",
        properties: {
          originalUrl: {
            type: "string",
            example: "https://example.com/assets/category_B/subcategory_C/Foo/",
          },
        },
        required: ["originalUrl"],
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../../app/index.js"];

const swaggerAG = swaggerAutogen(outputFile, endpointsFiles, doc);
module.exports = swaggerAG;
