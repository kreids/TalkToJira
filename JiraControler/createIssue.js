/**
 * http://usejsdoc.org/
 */

let request = require('request')

let jiraConf =require('../jiraConf')


function makeIssue(summary, type, callBack){
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
	request(httpOptions, callBack)
	
}

module.exports={
	'makeIssue': makeIssue
}
