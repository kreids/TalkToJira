/**
 * http://usejsdoc.org/
 */

let promptUserCreateIssue = require('../PromptUser/PromptUserCreateIssue.js')


function consumeInputCorrectly(assistant,dialogueState){
	console.log("STATE::::::::: "+dialogueState.state)
	switch(dialogueState.state){
	case 'getIssueType':
		dialogueState.state = "askSummary"
		getIssueType(assistant,dialogueState,promptUserCreateIssue.askNextPrompt);
		break;
	case 'getSummary':
		dialogueState.state = "done"
		getSummary(assistant,dialogueState,promptUserCreateIssue.askNextPrompt);
		break;
	}
}

function getIssueType(assistant, dialogueState, onSuccess){
	let input = assistant.getRawInput();
	console.log("**GETISSUETYPE**");

	//let dialogueState = assistant.getDialogState();
	console.log(JSON.stringify(dialogueState));
	
	if(input==='story'){
		dialogueState.data.issueType="story"
		dialogueState.state="askSummary"
		onSuccess(assistant, dialogueState);
		//assistant.ask(inputPrompt, dialogueState);
	}else if(input==='task'){
		//assistant.ask(inputPrompt, dialogueState);
	}
}

function getSummary(assistant,dialogueState, onSuccess){
	//let dialogueState = assistant.getDialogState();
	console.log("**GETSUMMARY**");

	let input = assistant.getRawInput();
	
	dialogueState.data.summary = input;
	
	onSuccess(assistant, dialogueState);
	
}

module.exports ={
		'consumeInputCorrectly': consumeInputCorrectly
}