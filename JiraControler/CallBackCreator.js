function makeCallBack(assistant, successMessage, errorMessage){
	return function(error,responce,body){
		if(error){
			assistant.tell(errorMessage)
		}
		else if (responce.statusCode>199 && responce.statusCode <300){
			assistant.tell(successMessage)	
		}
		
	}
	
}

module.exports={
	"makeCallBack" : makeCallBack
}