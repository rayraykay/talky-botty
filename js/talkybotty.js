// hashmap
var classToIndexMap;

/*
 This loads the global classToIndexMap hashmap
 It will return the relative indices of all the elements
 contained with a div with class "USER col", where USER can
 be "user", "bot" etc

 For now, the indices are hardcoded.

 This function is meant to be invoked at the load of the webpage.
*/
function loadClassToIndexMap() {
	classToIndexMap = {"user": 0, "bot": 1};
}

/*
*/
function displayMessage (senderClass, receiverClass) {
	// get the message lists to append to
	let senderMessages = $("ul").eq(classToIndexMap[senderClass]);
	let receiverMessages = $("ul").eq(classToIndexMap[receiverClass]);

	let senderTextInput = $("input[type=text]").eq(classToIndexMap[senderClass]);

	// only send non-empty text
	if (senderTextInput.val().trim()) {
		// display on the sender window
		senderMessages.append( $("<li>", {
			html: senderTextInput.val(),
			"class": "message sent"
		}) );
		senderMessages.append( $("<br />") );

		// display on receiver window
		receiverMessages.append( $("<li>", {
			html: senderTextInput.val(),
			"class": "message received"
		}) );
		receiverMessages.append( $("<br />") );

		// delete the input
		senderTextInput.val("");
	}

	let senderFileInput = $("input[type=file]").eq(classToIndexMap[senderClass]);

	// only send a file if there is one
	if (senderFileInput[0].files.length) {
		let file = senderFileInput[0].files[0];
		let reader = new FileReader();

		// add listener that will add the photo as an <img> in an <li>
		reader.addEventListener ("load", function() {
			// file as a jquery object
			let $file = $("<img>", {
				src: reader.result,
				alt: reader.result
			});

			senderMessages.append( $("<li>", {
				html: $file.prop('outerHTML'), // plug in raw html of $image
				"class": "message sent"
			}) );
			senderMessages.append( $("<br />") );

			receiverMessages.append( $("<li>", {
				html: $file.prop('outerHTML'),
				"class": "message received"
			}) );
			receiverMessages.append( $("<br />") );
		});

		// ensure that the file is read and delete the input so as to
		// not repeatedly upload it
		if (file) {
			reader.readAsDataURL(file);
			senderFileInput.val("");
		}
	}

	// set the scroll bar of both boxes to be the bottom
	let senderChatbox = $(".box").eq(classToIndexMap[senderClass]);
	let receiverChatbox = $(".box").eq(classToIndexMap[receiverClass]);
	senderChatbox.scrollTop(senderChatbox[0].scrollHeight);
	receiverChatbox.scrollTop(receiverChatbox[0].scrollHeight);
}

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
	let textInputs = document.getElementsByTagName('input');
	let toDisplay = textInputs[classToIndexMap[userClass]].value;

	windowAlert(toDisplay);
}

function windowAlert (textToDisplay) {
    if (document.body)
        window.alert(textToDisplay);
    else
        notSupported();
}
