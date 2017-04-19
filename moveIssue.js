let request = require('request')

let jiraConf =require('./jiraConf')

function placeHolder(error,responce,body){
	console.log(error)
	console.log("statusCode: "+responce.statusCode)
	console.log(body)
}

function executeTransition(key,transitionId){
	let httpOptions = {
			'url' : jiraConf.auth.url+'/rest/api/2/issue/'+key+'/transitions',
			'method': "POST",
			'headers':{
				'Authorization': "Basic "+ jiraConf.auth.login,
			},
			'json':{
				'transition':transitionId
			}
			
	}
	request(httpOptions, placeHolder)

}

function makeMoveIssue(key,status){
	return function(error,responce,body){
		let transitions = JSON.parse(body).transitions
		for (var i = 0, len = transitions.length; i < len; i++) {
			if(transitions[i].name===status){
  				console.log(transitions[i])
  				executeTransition(key,transitions[i].id)
  			}
		}
	}
}

function getTransitions(key, callback){
	let httpOptions = {
			'url' : jiraConf.auth.url+'/rest/api/2/issue/'+key+'/transitions',
			'method': "GET",
			'headers':{
				'Authorization': "Basic "+ jiraConf.auth.login,
			},
			
	}
	request(httpOptions, callback)
	
}

function moveIssueToStatus(key,status){
	console.log(key)
	console.log(status)
	getTransitions(key,makeMoveIssue(key,status))

}

module.exports={
	'moveIssueToStatus': moveIssueToStatus
}