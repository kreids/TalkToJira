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

let promptUserCreateIssue = require('./PromptUserCreateIssue.js')
let consumeCreateIssueInputs = require('./ConsumeCreateIssueInput.js')


let app = express();
app.set('port', (process.env.PORT || 8082));
app.use(bodyParser.json({type: 'application/json'}));



function mainIntent (assistant) {
	console.log('mainIntent: '+ assistant);
	promptUserCreateIssue.askNextPrompt(assistant,{'state':'start','data':{}})
}

function rawInput (assistant) {
	console.log('rawInputIssueType: \'' +assistant.getRawInput()+'\'');
	let dialogueState = assistant.getDialogState();
	console.log('state: \''+ JSON.stringify(dialogueState) +'\'')
	
	switch(dialogueState.state){
		case 'getIssueType':
			consumeCreateIssueInputs.getIssueType(assistant,promptUserCreateIssue.askNextPrompt);
			break;
		case 'getSummary':
			consumeCreateIssueInputs.getSummary(assistant);
			break;
	}
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
