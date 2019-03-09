var snGoogleTranslate = Class.create();
snGoogleTranslate.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    ui16: function () {
        var ui16Property = gs.getProperty("google.translate.ui16");
        return ui16Property;
    },

    rest: function (source, target, text) {
        var r = new sn_ws.RESTMessageV2('snGoogleTranslate', 'Google Translate');

        r.setStringParameter("client", "gtx");
        r.setStringParameter("sl", source);
        r.setStringParameter("tl", target);
        r.setStringParameter("dt", "t");
        r.setStringParameter("q", text);

        var response = r.execute();
        var responseBody = response.getBody();

        //Parse results and print to screen
        var results = responseBody.split(",");
        var sourceText = results[1];
        var translatedText = results[0].replace("[[[", "");

        var cleanTranslatedText = translatedText.replace(/['"]+/g, '');
        return cleanTranslatedText;
    },

    connectSourceLanguage: function () {

        var source = current.profile.document;
        var sourceLanguage = new GlideRecord('sys_user');
        sourceLanguage.get('sys_id', source);

        return sourceLanguage.preferred_language || 'en';
    },

    connectTargetLanguages: function () {

        var targetLanguagesArray = [];

        var targetMember = new GlideRecord('live_group_member');
        targetMember.addQuery('group', current.group);
        targetMember.addQuery('member.document', '!=', current.profile.document);
        targetMember.query();

        while (targetMember.next()) {
            var targetLanguage = new GlideRecord('sys_user');
            targetLanguage.get('sys_id', targetMember.member.document);

            targetLanguagesArray.push(targetLanguage.preferred_language);

        }

        return targetLanguagesArray;

    },

    importDictionary: function (table, source, target) {

        var tableToTranslate = table; //TABLE
        var sourceLanguage = source; //SOURCE LANGUAGE
        var targetLanguage = target; //TARGET LANGUAGE

        var fields = new GlideRecord("sys_documentation");
        fields.addQuery("name", tableToTranslate);
        fields.query();

        while (fields.next()) {

            var translatedRecord = new GlideRecord('sys_documentation');
            translatedRecord.newRecord();
            translatedRecord.name = fields.name;
            translatedRecord.label = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, fields.label);
            translatedRecord.plural = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, fields.plural);
            translatedRecord.element = fields.element;
            translatedRecord.language = targetLanguage;
            translatedRecord.url = fields.url;
            translatedRecord.url_target = fields.url_target;

            if (fields.hint != '') {
                translatedRecord.hint = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, fields.hint);
            }
            if (fields.help != '') {
                translatedRecord.help = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, fields.help);
            }
            translatedRecord.insert();
        }

        gs.flushMessages();
    },

    importChoices: function (table, choiceList, source, target) {

        var tableToTranslate = table; //TABLE
        var choiceListToTranslate = choiceList; //DICTIONARY

        var sourceLanguage = source; //SOURCE LANGUAGE
        var targetLanguage = target; //TARGET LANGUAGE

        var choice = new GlideRecord("sys_choice");
        choice.addQuery("name", tableToTranslate);
        choice.addQuery('element', choiceListToTranslate);
        choice.addQuery('language', sourceLanguage);
        choice.query();

        while (choice.next()) {

            var translatedChoice = new GlideRecord('sys_choice');
            translatedChoice.newRecord();
            translatedChoice.name = choice.name;
            translatedChoice.label = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, choice.label);
            translatedChoice.value = choice.value;
            translatedChoice.element = choice.element;
            translatedChoice.language = targetLanguage;
            translatedChoice.sequence = choice.sequence;
            translatedChoice.inactive = choice.inactive;

            if (choice.hint != '') {
                translatedChoice.hint = new snGoogleTranslate().rest(sourceLanguage, targetLanguage, choice.hint);
            }
            translatedChoice.insert();
        }
        gs.flushMessages();
    },

    type: 'snGoogleTranslate'
});