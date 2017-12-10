# git-raw-html-render

## What it does
This extension is used to render the raw single html page of github.com and gitlab.com, which are used by me frequently.

## File structure.
* manifest.json is used to declare meta data, below are the special items.
 - persissions: only activeTab permission was required , in this version.
 - content_scripts: Just match "https://gitlab.com/*", any tab whose url does not match will not be inject the special js script (toggleGitlabRaw.js).
 - background: declare browser main script.
 - browser_action: declare default actions in BOM.
* background.js will judge the url of active tab in current window , and handle in different way according weather it's github.com's raw git page or gitlab.com's.
* toggleGitlabRaw.js is just used for gitlab raw git page.

## documentations
* documentation for manifest.json https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json
* documentation for background.js https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/background
* documentation for emit a browser action (just bind function to the extension's element's event):
 - https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_actions
 - https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction

## How to install it temporarily and develop
* https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox

## Usage flow
- Make sure you have open the html git raw page.
- Click the h5css3 icon in the firefox toolbar, the html git raw page will be rendered.

## later, when this extension was better, I would publish it onto firefox offical addon libiray.

# Enjoy It !

