const originInnerHTMLStr = document.body.innerHTML;
const originInnerText = document.body.innerText;

// links examples:
// "/css/site.css"
// "style/another-site.css"
// "../plugin/plugin.js"
// "./pub/plugin.js"
// "js/app.js"
// href="url"
// href="path"
// src="url"
// src="path"

let replacedInnerText = originInnerHTMLStr.replace(/ (href|src)=(["'])([^"']+)$1/, function(){
    console.log(arguments[2]);
    return arguments[2];
 });
    // alert(`If you can see this message, the toggleGitlabRaw.js was exectued!`);

function toggleHtml(request, sender, sendRequest) {
    // alert(`If you can see this message, the toggleHtml in toggleGitlabRaw.js was exectued!`);
    document.body.innerHTML = request.isOrigin % 2 === 0 ? originInnerText : originInnerHTMLStr;
}

browser.runtime.onMessage.addListener(toggleHtml);