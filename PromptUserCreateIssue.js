/**
 * http://usejsdoc.org/
 */

function askNextPrompt(assistant,dialogueState){
	switch(dialogueState.state){
	case 'start':
		askIssueType(assistant,dialogueState);
		break;
	case 'getIssueType':
		askSummary(assistant,dialogueState);
		break;
	case 'getSummary':
		complete(assistant,dialogueState)
		break;
	}		
}

function askIssueType(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What type of JIRA issue would you like to create?',
			['I didn\'t hear an issue type']);
	console.log(JSON.stringify(dialogueState));
	dialogueState.state = 'getIssueType'
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
	dialogueState.state = 'getSummary'
	if(!dialogueState.data.summary){
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		askNextPrompt(assistant,dialogueState);	
	}
}

function complete(assistant, dialogueState){
	assistant.tell("Creating a "+ dialogueState.data.issueType+" with summary: "+ dialogueState.data.summary);
	createIssue.makeIssue(dialogueState.data.summary,dialogueState.data.issueType);
}

module.exports = {
		'askNextPrompt': askNextPrompt
}