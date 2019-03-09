(function executeRule(current, previous /*null when async*/ ) {

    var source = new snGoogleTranslate().connectSourceLanguage();
    var targetArray = new snGoogleTranslate().connectTargetLanguages();
    var text = current.message.toString();
    var output = "";

    var id = current.group;
    var isWorkNotes = current.reflected_field;
    if (isWorkNotes == 'work_notes') {
        isWorkNotes = true;
    } else {
        isWorkNotes = false;
    }

    for (i = 0; i < targetArray.length; i++) {
        if (source != targetArray[i] && targetArray[i] != "") {
            output += "Translation: " + "(" + targetArray[i] + ") - " + new snGoogleTranslate().rest(source, targetArray[i], text) + "\n";
        }
    }

    new SNC.LiveFeedApi().addMessage(output, id, "", isWorkNotes);

})(current, previous);