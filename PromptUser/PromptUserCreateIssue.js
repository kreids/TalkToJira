/**
 * http://usejsdoc.org/
 */

 let createIssue=require('../JiraControler/createIssue.js')


function askNextPrompt(assistant,dialogueState){
	console.log("STATE-------- "+dialogueState.state)
	switch(dialogueState.state){
	case 'start':
		dialogueState.state= 'askIssueType'
		askNextPrompt(assistant,dialogueState)
		break;
	case 'askIssueType':
		askIssueType(assistant,dialogueState);
		break;
	case 'askSummary':
		askSummary(assistant,dialogueState);
		break;
	case 'done':
		complete(assistant,dialogueState)
		break;
	}		
}

function askIssueType(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What type of JIRA issue would you like to create?',
			['I didn\'t hear an issue type']);
	console.log("**ASKISSUETYPE**");
	console.log(JSON.stringify(dialogueState));
	//dialogueState.state = 'getIssueType'
	if(!dialogueState.data.issueType){
		dialogueState.state = "getIssueType"
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		dialogueState.state = 'askSummary'
		askNextPrompt(assistant,dialogueState);
	}
}

function askSummary(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What would you like your summary to be?',
			['Huh']);

	console.log("**ASKSUMMARY**");

	//dialogueState.state = 'getSummary'
	if(!dialogueState.data.summary){
		dialogueState.state = "getSummary"
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		dialogueState.state = 'done'
		askNextPrompt(assistant,dialogueState);	
	}
}

function complete(assistant, dialogueState){
	console.log("**COMPLETE**");

	assistant.tell("Creating a "+ dialogueState.data.issueType+" with summary: "+ dialogueState.data.summary);
	createIssue.makeIssue(dialogueState.data.summary,dialogueState.data.issueType);
}

module.exports = {
		'askNextPrompt': askNextPrompt
}