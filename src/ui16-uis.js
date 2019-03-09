var ga = new GlideAjax('snGoogleTranslate');
ga.addParam('sysparm_name', 'ui16');
ga.getXML(GoogleTranslateUI16);

function GoogleTranslateUI16(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if (answer == 'true') {
        google_translate();
    }
}

function google_translate() {
    if (typeof jQuery === 'function' && typeof top.$j === 'function') {
        jQuery(document).ready(function () {
                var top = window.top;
                if (typeof top.google_translate_loaded != 'undefined') {
                    return;
                }
                top.google_translate_loaded = true;


                var googleTranslate;

                googleTranslate = '<div id="google_translate_element" class="navpage-header-content">' +
                    '</div>' +
                    '<script type="text/javascript">' +
                    'function googleTranslateElementInit() {new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, "google_translate_element");}' +
                    '</script>' +
                    '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">' +
                    '</script>';
                top.$j('#sysparm_search').parents('div.navpage-header-content').first().before(googleTranslate);

            }

        );
    }
}