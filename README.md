# Intruduce
* git-raw-html-render is the un-published firefox extension, see [How to install it temporarily and develop](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox);
* get-html-via-nodejs is the nodejs server for the requesting and responsing of raw.githubusercontent.com, gitlab.com raw html render need not to access the server whom hosts this server.

---

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

## later, when this extension was better, I would publish it onto firefox offical addon libiray.

# Enjoy It !

---

# get-html-via-nodejs

## Can do what?
request special url, and response to your client.

## Usage
* type below command in terminal.
```
 git clone this ${THIS_REPO_LINK}
 cd ${downloaded repo directory}
```
* make sure you install the firefox-extension, as referenced above, you can follow [Temporary_Installation_in_Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
* type below command in terminal.
```
cd 
cd get-html-via-nodejs
npm install 
node index.js
```
- Open firefox browser, and make sure you have open the html git raw page.
- Click the h5css3 icon in the firefox toolbar, the html git raw page will be rendered.


## PS
* If you use get-html-via-nodejs to access other site, the url must look like: `http://localhost:57777/${encodeURIComponent("http://your.site.url/path/params")}`; 
* If you would like to use forever or pm2, that's all right, node service will restart when it was crashed.

# Enjoy it!
