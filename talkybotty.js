/*
 Displays the message in the text box specified by the userClass
 class name. Note that one does not have to check for existance of
 the body.
 
 @param {string} userClass The string of the class name whose text box is to be
 displayed.
*/
function displayMessageToWindow (userClass) {
	// need a better way of getting the specified text,
	// possibly putting the index values into a hashmap
	// keyed by the class name ('user', 'bot' etc) beforehand,
	// not hardcoding it here
	var classToIndexMap = {"user": 0, "bot": 1};
	var textInputs = document.getElementsByTagName('input');
	var toDisplay = textInputs[classToIndexMap[userClass]].value;
	
	windowAlert(toDisplay);
}

function windowAlert (textToDisplay) {
    if (document.body)
        window.alert(textToDisplay);
    else
        notSupported();
}
