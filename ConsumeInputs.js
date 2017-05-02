let consumeCreateIssueInputs = require('./ConsumeCreateIssueInput.js')
let consumeMoveIssueInputs = require('./ConsumeMoveIssueInput.js')

function consume(assistant,dialogueState){
	switch (dialogueState.function){
	case 'create':
		consumeCreateIssueInputs.consumeInputCorrectly(assistant,dialogueState)
		break;
	case 'move':
		consumeMoveIssueInputs.consumeInputCorrectly(assistant,dialogueState)
		break;
	}
}
module.exports ={
		'consumeInputCorrectly': consume
}