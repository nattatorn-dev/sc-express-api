function normal(data){
	return { meta : { code : 200 },data};
}

function invalidParam(err){
	return { meta : { code : 4001 , message : "validation error", errors : err }}; 
}

function noRecord(){
	return { meta : { code : 4004 , message : "no record is found"}}; 
}

function systemError(err){
	return { meta : { code : 5001 , message : "system error", errors : err }}; 
}

export default {normal, invalidParam, noRecord, systemError}