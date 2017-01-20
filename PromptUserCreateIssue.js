/**
 * http://usejsdoc.org/
 */
function askIssueType(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What type of JIRA issue would you like to create?',
			['I didn\'t hear an issue type']);
	if(!dialogueState.data.issueType){
		assistant.ask(inputPrompt,{'state':'getIssueType','data':{}});
	}
	else{
		
	}
}

function askSummary(assistant, dialogueState){
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What would you like your summary to be?',
			['Huh']);
	if(!dialogueState.data.summary){
		dialogueState.state = 'getSummary'
		assistant.ask(inputPrompt,dialogueState);
	}
	else{
		
	}
}

module.exports = {
		'askIssueType': askIssueType,
		'askSummary': askSummary
}