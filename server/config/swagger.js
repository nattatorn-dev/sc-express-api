import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'sc express api', // Title (required)
      version: '1.0.0', // Version (required)
    },
    basePath : "/v1",
    tags : [
    	{
    		name : "Users",
    		description : "Users API"	
		}
	]
  },
  apis: [
  	'./server/routes/user.js'
  ], 
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
export default swaggerJSDoc(options);