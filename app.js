// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

process.env.DEBUG = 'actions-on-google:*';

let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8081));
app.use(bodyParser.json({type: 'application/json'}));



function mainIntent (assistant) {
	console.log('mainIntent: '+ assistant);
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What type of JIRA issue would you like to create?',
			['I didn\'t hear an issue type']);
	assistant.ask(inputPrompt,{'state':'getIssueType','data':{}});
}

function getIssueType(assistant){
	let input = assistant.getRawInput();
	
	let inputPrompt = assistant.buildInputPrompt(true, 
			'What would you like the summary of your ' + input +' to be',
			['Huh?']);
	let dialogueState = assistant.getDialogState();
	dialogueState.data.issueType = input;
	dialogueState.state = 'getSummary';
	
	
	if(input==='story'){
		assistant.ask(inputPrompt, dialogueState);
	}else if(input==='task'){
		assistant.ask(inputPrompt, dialogueState);
	}
}

function rawInput (assistant) {
	console.log('rawInputIssueType: \'' +assistant.getRawInput()+'\'');
	let dialogueState = assistant.getDialogState();
	console.log('state: \''+ JSON.stringify(dialogueState) +'\'')
	
	switch(dialogueState.state){
		case 'getIssueType':
			getIssueType(assistant);
			break;
		
	}
	
	/*if(state.state === 'getIssueType' && assistant.getRawInput() === 'story'){
		state.state = ''
		assistant.tell('Creating a story');
	} else {
		let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
				assistant.getRawInput() + '</say-as></speak>',
				['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
		assistant.ask(inputPrompt);
	}*/
}

app.post('/', function (request, response) {
	console.log('handle post');
	const assistant = new ActionsSdkAssistant({request: request, response: response});



	let actionMap = new Map();
	actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
	actionMap.set(assistant.StandardIntents.TEXT, rawInput);

	assistant.handleRequest(actionMap);
});

//Start the server
let server = app.listen(app.get('port'), function () {
	console.log('App listening on port %s', server.address().port);
	console.log('Press Ctrl+C to quit.');
});
//[END app]
