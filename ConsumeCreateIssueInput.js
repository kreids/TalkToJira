/**
 * http://usejsdoc.org/
 */

function getIssueType(assistant, onSuccess){
	let input = assistant.getRawInput();
	
	let dialogueState = assistant.getDialogState();
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
		'getIssueType': getIssueType,
		'getSummary': getSummary
}