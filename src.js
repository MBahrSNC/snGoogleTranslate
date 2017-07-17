function google_translate ()
{
	if (typeof jQuery === 'function' && typeof top.$j === 'function') {
		jQuery(document).ready(function () {
			var top = window.top;
			var googleTranslate;
			
				googleTranslate = '<div id="google_translate_element" class="navpage-header-content">' +
				'</div>' +
				'<script type="text/javascript">' +
				'function googleTranslateElementInit() {new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, "google_translate_element");}' +
					'</script>'+
					'<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">' +
					'</script>';
					top.$j('#sysparm_search').parents('div.navpage-header-content').first().before(googleTranslate);
					
			}
			
			);
		}
	}
	google_translate();