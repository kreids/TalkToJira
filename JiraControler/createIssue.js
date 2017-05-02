/**
 * http://usejsdoc.org/
 */

let request = require('request')

let jiraConf =require('../jiraConf')

function placeHolder(error,responce,body){
	console.log(error)
	console.log("statusCode: "+responce.statusCode)
	console.log(body)
}

function makeIssue(summary, type){
	let jiraOptions = {
			"fields":{
				"project":{
					"key": "TES"
				},
				"summary": summary,
				"description" : "made with google actions",
				"issuetype": {
					"name": 'Story'
				}
			}
	}
	let httpOptions = {
			'url' : jiraConf.auth.url+'/rest/api/2/issue/',
			'method': "POST",
			'headers':{
				'Authorization': "Basic "+ jiraConf.auth.login,
			},
			'json': jiraOptions
			
	}
	request(httpOptions, placeHolder)
	
}

module.exports={
	'makeIssue': makeIssue
}
