let promptUserMoveIssue = require('../PromptUser/PromptUserMoveIssue.js')


function consumeInputCorrectly(assistant,dialogueState){
	console.log("STATE::::::::: "+dialogueState.state)
	switch(dialogueState.state){
	case 'getIssueId':
		dialogueState.state = "askNewStatus"
		getIssueId(assistant,dialogueState,promptUserMoveIssue.askNextPrompt);
		break;
	case 'getNewStatus':
		dialogueState.state = "done"
		getNewStatus(assistant,dialogueState,promptUserMoveIssue.askNextPrompt);
		break;
	}
}

function getIssueId(assistant, dialogueState, onSuccess){
	let input = assistant.getRawInput();
	console.log("**GETISSUEID**");
	console.log("sdjklfa "+dialogueState.state)

	//let dialogueState = assistant.getDialogState();
	console.log(JSON.stringify(dialogueState));
	
	
	dialogueState.data.issueId=input
	onSuccess(assistant, dialogueState);
}

function getNewStatus(assistant, dialogueState, onSuccess){
	let input = assistant.getRawInput();
	console.log("**GETNEWSTATUS**");

	//let dialogueState = assistant.getDialogState();
	console.log(JSON.stringify(dialogueState));
	
	
	dialogueState.data.newStatus=input
	onSuccess(assistant, dialogueState);
}

module.exports ={
		'consumeInputCorrectly': consumeInputCorrectly
}