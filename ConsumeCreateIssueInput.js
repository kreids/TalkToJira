/**
 * http://usejsdoc.org/
 */

let promptUserCreateIssue = require('./PromptUserCreateIssue.js')
let createIssue=require('./createIssue.js')


function consumeInputCorrectly(assistant,dialogueState){
	switch(dialogueState.state){
	case 'start':
		dialogueState.state = "getIssueType"
		getIssueType(assistant,dialogueState,promptUserCreateIssue.askNextPrompt);
		break;
	case 'getIssueType':
		dialogueState.state = "getSummary"
		getSummary(assistant,dialogueState,promptUserCreateIssue.askNextPrompt);
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

function getSummary(assistant,dialogueState, onSuccess){
	let dialogueState = assistant.getDialogState();
	let input = assistant.getRawInput();
	
	dialogueState.data.summary = input;
	onSuccess(assistant, dialogueState);
	
}

module.exports ={
		'consumeInputCorrectly': consumeInputCorrectly
}