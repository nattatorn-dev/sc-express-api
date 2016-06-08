/*-----------------handle field for mongo filter------------------------*/
function handleFields(req,res,next){
	var fields = req.query.fields;
	var fieldsJson = {};
	if(typeof fields !== "undefined"){
		var fieldsArray = fields.split(',');
		for(var i in fieldsArray){
			fieldsJson[fieldsArray[i]] = 1;
		}
	}
	req.query.fields = fieldsJson;
	next();
};


function handleListParams(req,res,next){
	/*-----------------handle page and count------------------------*/
	var page = typeof req.query.page === "undefined"  ? 0 : parseInt(req.query.page);
	var limit = typeof req.query.count === "undefined" ? 10 : parseInt(req.query.count);
	var skip  = page * limit;

	req.query.limit = limit;
	req.query.skip = skip;

	/*-----------------handle sort------------------------*/
	var sorts = req.query.sorts;
	var sortsJson = {};
	if(typeof sorts !== "undefined"){
		var sortsArray = sorts.split(',');
		for(var i in sortsArray){
			if(sortsArray[i].startsWith("-"))
				sortsJson[sortsArray[i].substr(1)] = -1;
			else 
				sortsJson[sortsArray[i]] = 1;
		}
	}
	req.query.sorts = sortsJson;
	next();
};
export default {handleFields, handleListParams}
