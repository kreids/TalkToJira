/**
 * http://usejsdoc.org/
 */

let promptUserCreateIssue = require('./PromptUserCreateIssue.js')


function consumeInputCorrectly(assistant,dialogueState){
	switch(dialogueState.state){
	case 'start':
		dialogueState.state = "getIssueType"
		getIssueType(assistant,dialogueState,promptUserCreateIssue.askNextPrompt);
		break;
	case 'getIssueType':
		dialogueState.state = "getSummary"
		getSummary(assistant);
		break;
	}
}

function getIssueType(assistant, dialogueState, onSuccess){
	let input = assistant.getRawInput();
	
	//let dialogueState = assistant.getDialogState();
	console.log(JSON.stringify(dialogueState));
	dialogueState.data.issueType = input;
	
	if(input==='story'){
		onSuccess(assistant, dialogueState);
		//assistant.ask(inputPrompt, dialogueState);
	}else if(input==='task'){
		//assistant.ask(inputPrompt, dialogueState);
	}
}

function getSummary(assistant){
	let dialogueState = assistant.getDialogState();
	let input = assistant.getRawInput();
	
	dialogueState.data.summary = input;
	
	assistant.tell("Creating a "+ dialogueState.data.issueType+" with summary: "+ dialogueState.data.summary);
}

module.exports ={
		'consumeInputCorrectly': consumeInputCorrectly
}