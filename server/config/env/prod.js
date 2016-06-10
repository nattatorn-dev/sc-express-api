const config = {
	env: 'production',
	mongo : {
		url : 'mongodb://localhost:27017/sc-express-db-es6'
	},
	redis : {
		host : "localhost",
		port : 6379,
		expire : {
      		'200' : 5000,
            '304' : 5000,
      		'xxx' : 1
    	},
    	prefix : 'prod_sc_express_api_es6'
	},
	port: 3000,
	logger : {
		method : "file",
		level : "info",
		filePath : "/opt/sc-express-api-es6/logs/all-logs.log"
	}
};

export default config;
