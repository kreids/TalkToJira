/**
 * http://usejsdoc.org/
 */

function askNextPrompt(assistant,dialogueState){
	switch(dialogueState.state){
	case 'start':
		dialogueState.state = "getIssueType"
		askIssueType(assistant,dialogueState);
		break;
	case 'getIssueType':
		dialogueState.state = "getSummary"
		askSummary(assistant,dialogueState);
		break;
	}
		
}

function askIssueType(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What type of JIRA issue would you like to create?',
			['I didn\'t hear an issue type']);
	if(!dialogueState.data.issueType){
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		askNextPrompt(assistant,dialogueState);
	}
}

function askSummary(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What would you like your summary to be?',
			['Huh']);
	if(!dialogueState.data.summary){
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		
	}
}

module.exports = {
		'askNextPrompt': askNextPrompt
}