// const thisHtmlLocation = window.location.href;
// // /https?:\/\/[^\/]+\//
// const thisDecodedRealHtmlLocation = thisHtmlLocation.replace(/https?:\/\/[^\/]+\/https?%3A%2F%2F(.+)$/, function () {
//
// });

let realThisRawPath;
window.location.href.replace(/https?:\/\/[^\/]+\/https?%3A%2F%2F(.+)$/, function () {
    realThisRawPath = decodeURIComponent(arguments[1]);
    console.log(realThisRawPath);
});

function relativeToAbs(path) {
    alert(`if you can see this line, the relativeToAbs function has been executed!`);
    if (/^\//.test(path)) return path;
    const segs = path.split('/');
    const realRawPathSegAry = realThisRawPath.split('/');
    console.log(`realRawPathSegAry is ${realRawPathSegAry}, right?`);
    realRawPathSegAry.pop(); //去掉当前原始html url的basename (就是 [^\/]\.+html);
    for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        if ('.' === seg) {
            return void 0;
        }
        else if ('..' === seg) {
            realRawPathSegAry.pop();
        }
        else {
            realRawPathSegAry.push(seg);
        }
    }
    console.log(`the handeled path is ${realRawPathSegAry.join('/')}, right?`);
    return realRawPathSegAry.join('/');
};

function genValidAbsUrl(location) {
    console.log(`The argument location was passed in, is: ${location}, right?`);
    if (/^(http|https):\/\/([^\/].+)$/.test(location)) {
        // location = location.replace(/^(http|https):\/\/([^\/].+)$/, function () {
        //     location = `${relativeToAbs(arguments[1])}`;
        // })
        location = arguments[2];
    }
    console.log(`The location would be pass into relativeToAbs function as path argument is: ${location}, right?`);
    location = `http://${relativeToAbs(location)}`;
    location = encodeURIComponent(location);
    const validAbsUrl = `http://iocss.cc/${location}`;
    return validAbsUrl;
}

const resourceReg = /\s+(href|src)\s*=\s*(["'])([^"']+)\2/g;
const originInnerHTMLStr = document.documentElement.outerHTML;
let replacedInnerText = originInnerHTMLStr.replace(resourceReg, function () {
    console.log(arguments);
    let qoute = arguments[2];
    let resourceLocation = arguments[3];
    resourceLocation = genValidAbsUrl(resourceLocation);
    console.log(`resourceLocation is ${resourceLocation}, right?`);
    let unitReplacedStr = ` ${arguments[1]}=${qoute}${resourceLocation}${qoute}`;
    return unitReplacedStr;
});

function toggleReplaceHtml(request, sender, sendRequest) {
    const isOrigin = request.isOrigin;
    document.documentElement.innerHTML = request.isOrigin ? replacedInnerText : originInnerHTMLStr;
}

function executeReplacedScript() {
    var scriptAry = [].slice.call(document.getElementsByTagName('script'));
    scriptAry.forEach(function (item) {
        const src = item.src;
        var script = document.createElement('script');
        script.src = src;
        document.body.insertBefore(script, item);
        item.parentNode.removeChild(item);
    });
}

function loadResourcesAndExec(request, sender, sendRequest) {
    new Promise(function (resolve, reject) {
        resolve(true);
    })
        .then(toggleReplaceHtml(request, sender, sendRequest))
        .then(executeReplacedScript())
}

browser.runtime.onMessage.addListener(toggleReplaceHtml);
