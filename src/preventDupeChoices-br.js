if (current.operation() == "update") {
    handleUpdate();
} else {
    handleInsert();
}

function handleUpdate() {
    var errMsgBgnng;

    if (current.name == previous.name && current.element == previous.element && current.language == previous.language && current.value == previous.value) {
        // Allow update to other fields
        gs.log("-----------------sys_choice: B4BR::NoDuplicates: Keys haven't changed.  Allowing to proceed with the update.");
        return;
    }

    if (current.name != previous.name) {
        // Prevent name change
        gs.log("-----------------sys_choice: B4BR::NoDuplicates: Name have changed.  Aborting update.");
        errMsgBgnng = gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'name'));
        current.name.setError(errMsgBgnng + " " + gs.getMessage("in documentation record can not be changed."));
    } else if (current.element != previous.element) {
        // Prevent element change
        gs.log("-----------------sys_choice: B4BR::NoDuplicates: Element have changed.  Aborting update.");
        errMsgBgnng = gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'element'));
        current.element.setError(errMsgBgnng + " " + gs.getMessage("in documentation record can not be changed."));
    } else if (current.language != previous.language) {
        // Prevent language change
        gs.log("-----------------sys_choice: B4BR::NoDuplicates: Language have changed.  Aborting update.");
        errMsgBgnng = gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'language'));
        current.language.setError(errMsgBgnng + " " + gs.getMessage("in documentation record can not be changed."));
    }
    current.setAbortAction(true);
}

function handleInsert() {
    // Prevent duplicate table entries
    gs.log("-----------------sys_choice: B4BR::NoDuplicates: Keys changed or insert. Doing validation.");
    var label = new GlideRecord('sys_choice');
    label.addQuery('name', current.name);
    label.addQuery('element', current.element);
    label.addQuery('language', current.language);
    label.addQuery('value', current.value);

    label.query();
    if (label.next()) {
        var errMsg = gs.getMessage("A choice record with the same values of") + " " +
            gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'name')) + gs.getMessage(",") + " " +
            gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'value')) + gs.getMessage(",") + " " +
            gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'element')) + " " + gs.getMessage("and") + " " +
            gs.getMessage(GlideMetaData.getTableFieldLabel('sys_choice', 'language')) + " " +
            gs.getMessage("fields already exists");
        gs.addErrorMessage(errMsg);
        current.setAbortAction(true);
    }
}