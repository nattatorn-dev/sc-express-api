const config = {
	env: 'uat',
	db: 'mongodb://localhost:27017/sc-express-db-es6',
	port: 3000,
	logger : {
		method : "console",
		level : "info",
		filePath : ""
	}
};

export default config;
