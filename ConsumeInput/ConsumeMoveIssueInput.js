let promptUserMoveIssue = require('../PromptUser/PromptUserMoveIssue.js')
let callBackCreator = require('../JiraControler/CallBackCreator.js')
let moveIssue=require('../JiraControler/moveIssue.js')

function consumeInputCorrectly(assistant,dialogueState){
	console.log("STATE::::::::: "+dialogueState.state)
	switch(dialogueState.state){
	case 'getIssueId':
		dialogueState.state = "askNewStatus"
		getIssueId(assistant,dialogueState,promptUserMoveIssue.askNextPrompt);
		break;
	case 'getNewStatus':
		dialogueState.state = "done"
		getNewStatus(assistant,dialogueState);
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

function getNewStatus(assistant, dialogueState){
	let input = assistant.getRawInput();
	console.log("**GETNEWSTATUS**");

	dialogueState.data.newStatus=input

	//let dialogueState = assistant.getDialogState();
	console.log(JSON.stringify(dialogueState));
	moveIssueCallBack = callBackCreator.makeCallBack(
			assistant,
			"Moving a "+ dialogueState.data.issueId+" to "+ dialogueState.data.newStatus,
			"Unable to move your issue at this time."
			)
	moveIssue.moveIssueToStatus(dialogueState.data.issueId,
		dialogueState.data.newStatus, moveIssueCallBack)
	
	
}

module.exports ={
		'consumeInputCorrectly': consumeInputCorrectly
}