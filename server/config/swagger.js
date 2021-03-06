import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'sc express api', // Title (required)
      version: '1.0.0', // Version (required)
      description: `A sample project for REST CRUD API with mongoDB \n\n
      logging, profile, cache, swagger, babel, EC2016`,
      contact: {
        name: 'Eddie Li',
        url: 'https://github.com/eddielisc',
        email: 'scli1989@gmail.com',
      },
    },
    basePath: '/v1',
    tags: [
      {
        name: 'Users',
        description: 'Users API',
      },
    ],
  },
  apis: [
    './server/config/apidoc/users.js',
  ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
export default swaggerJSDoc(options);
