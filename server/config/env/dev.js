const config = {
	env: 'development',
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
    	prefix : 'dev_sc_express_api_es6'
	},
	port: 3000,
	logger : {
		method : "console",
		level : "info",
		filePath : ""
	}
};

export default config;
