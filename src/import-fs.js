//Variables
var table = ''; //Table
var source = ''; //Source Language
var target = ''; //Target Language

//Used for translating choice lists
var choiceList = ''; //Dictionary / Choice List to translate


//Import Dictionary Translations
if (gs.getProperty('google.translate.import.dictionary') == 'true') {
    new snGoogleTranslate().importDictionary(table, source, target);
} else {
    gs.print("google.translate.import.dictionary property is not enabled.");
}


//Import Choice Translations
if (gs.getProperty('google.translate.import.choices') == 'true' && gs.getProperty('google.translate.prevent.dupe.choices') == 'true') {
    new snGoogleTranslate().importChoices(table, choiceList, source, target);
} else {
    gs.print('google.translate.import.choices AND google.translate.prevent.dupe.choices is not enabled.');
}