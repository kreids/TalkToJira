let moveIssue=require('./JiraControler/moveIssue.js')


function askNextPrompt(assistant,dialogueState){
	console.log("STATE-------- "+dialogueState.state)
	switch(dialogueState.state){
	case 'start':
		dialogueState.state= 'askIssueId'
		askNextPrompt(assistant,dialogueState)
		break;
	case 'askIssueId':
		askIssueId(assistant,dialogueState);
		break;
	case 'askNewStatus':
		askNewStatus(assistant,dialogueState);
		break;
	case 'done':
		complete(assistant,dialogueState)
		break;
	}		
}

function askIssueId(assistant,dialogueState){
	console.log(dialogueState.state)
	dialogueState.state="getIssueId"
	console.log(dialogueState.state)
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What issue would you like to move?',
			['I didn\'t hear an issue']);
	console.log("**ASKISSUEID**");
	
	assistant.ask(inputPrompt,dialogueState);
}

function askNewStatus(assistant,dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'Where would you like to move the issue?',
			['I didn\'t hear a status']);
	console.log("**ASKNEWSTATUS**");
	dialogueState.state = "getNewStatus"
	assistant.ask(inputPrompt,dialogueState);
	
}

function complete(assistant, dialogueState){
	console.log("**COMPLETE**");

	assistant.tell("Moving "+ dialogueState.data.issueId+" to "+ dialogueState.data.newStatus);
	moveIssue.moveIssueToStatus(dialogueState.data.issueId,dialogueState.data.newStatus);
}

module.exports = {
		'askNextPrompt': askNextPrompt
}