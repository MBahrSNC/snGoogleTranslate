# snGoogleTranslate

Google Translate and ServiceNow integration.

## Requirements

- [Google Translate Account][1]
- UI16
- Geneva, Helsinki, Istanbul, Jakarta releases

## Instructions

### Google Translate Instructions

1. Browse to: [Google Translate Account][1] and log in.
1. Click "Add Website now" and enter your instance.
1. Click "Next" on Plugins Settings section (this can be changed at anytime).

### Instance Instructions

1. Go to Retrieved Update Sets and select Import XML
1. Import the XML file, preview, and then commit the update set. (UI Script source code is in src.js)
1. Refresh your page and you should now see Google Translate in the upper right corner by your profile.

After all is done you're normal UI should look like

![Screenshot](./screenshot.png)

[1]: https://translate.google.com/manager/website]