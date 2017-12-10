const resourseExamplesAry = [
    `href="/css/site.css"`,
    `href="style/another-site.css"`,
    `src = "../plugin/plugin.js"`,
    `src= "./pub/plugin.js"`,
    `href = "js/app.js"`,
    `href= "url"`,
    `src ="path"`,
    `href = "url"`,
    `src = "path"`,
    `<link rel="stylesheet" href="/css/bootstrap.css">`,
    `<link rel="stylesheet" href="path">`,
    `<link rel="stylesheet" href="../path">`,
    `<link rel="stylesheet" href="./path">`,
    `<link rel="stylesheet" href="http://path">`,
    `<link rel="stylesheet" href="http://host:3000/path">`,
    `<link rel="stylesheet" href="http://host:3000/path.css">`,
    `<script src= "url">`,
    `<img src ="path">`,
    `<script src = "url">`,
    `<img src = "path">`
];

const thisHtmlLocation = 'https://github.com/about-debugging-d/HTML/blob/master/Topics/03.%20HTML-Tables/demos/1.%20Simple-tables.html';
const htmlExampleStr = `<html>
<head>
	<title>Tables</title>
</head>

<body>
	<table cellspacing="0" cellpadding="5">
	  <tr>
		<td>
			<img src="images/ppt.gif" alt="ppt" />
		</td>
		<td>
			<a href="https://rawgit.com/TelerikAcademy/HTML/master/Topics/01. Web-Basics/slides/index.html" target="_blank" title="lecture 1">Lecture 1</a>
		</td>
	  </tr>
	  
	  <tr>
		<td>
			<img src="images/ppt.gif" alt="ppt" />
		</td>
		<td>
			<a href="https://rawgit.com/TelerikAcademy/HTML/master/Topics/02. HTML-Fundamentals/slides/index.html" target="_blank" title="lecture 2">Lecture 2</a>
		</td>
	  </tr>
	  
	  <tr>
		<td>
			<img src="images/zip.gif" alt="zip" />
		</td>
		<td>
			<a href="https://github.com/TelerikAcademy/HTML/blob/master/Topics/02.%20HTML-Fundamentals/demos" target="_blank" title="lecture 2 demos">Lecture 2 - Demos</a>
		</td>
	  </tr>
	</table>
</body>
</html>`;
/*

*/

// const resourceReg = / (href|src)=(["'])([^"']+)$1/;
// const resourceReg = / (href|src)=(["'])([^"']+)\1/;
// const resourceReg = /\s+(href|src)\s*=\s*(["'])([^"']+)['"]/;
const resourceReg = /\s+(href|src)\s*=\s*(["'])([^"']+)\2/g;
// function replaceResourceTag(item, index) {
//     console.log(`${index} : ${item} : ${resourceReg.test(item)}`);
//     return resourceReg.test(item);
// }
//
// resourseExamplesAry.map(function (item, index) {
//     return replaceResourceTag(item, index);
// });


// relativeToAbs = function (parent) {
//     return function(p){
//         if ('.' != p.charAt(0)) return require(p);
//         var path = parent.split('/');
//         var segs = p.split('/');
//         path.pop();
//
//         for (var i = 0; i < segs.length; i++) {
//             var seg = segs[i];
//             if ('..' == seg) path.pop();
//             else if ('.' != seg) path.push(seg);
//         }
//
//         return require(path.join('/'));
//     };
// };

function relativeToAbs (path) {
    if(/^\//.test(path)) return path;

    var segs = path.split('/');
    const thisHtmlPathSegAry = thisHtmlLocation.split('/');

    thisHtmlPathSegAry.pop(); //去掉当前原始html url的basename (就是 [^\/]\.+html);
    for(let i=0; i<segs.length; i++){
        const seg = segs[i];
        if('.' === seg){
            return void 0;
        }
        else if('..' === seg){
            thisHtmlPathSegAry.pop();
        }
        else {
            thisHtmlPathSegAry.push(seg);
        }
    }
    return thisHtmlPathSegAry.join('/');
};

function genValidAbsUrl(location){
    if(/^(?:http|https):\/\/[^\/].+/.test(location)) return location;
    // let schema = '';
    // location = location.replace(/^((?:http|https):\/\/)?([^\/].*)$/, function () {
    //     schema = arguments[1];
    //     return arguments[2];
    // });
    location = relativeToAbs(location);
    // location = location.replace();
    location = encodeURIComponent(location);
    location = `http://localhost:57777/${location}`;
    return location;
}

let originInnerHTMLStr = htmlExampleStr;
let replacedInnerText = originInnerHTMLStr.replace(resourceReg, function(){
    console.log(arguments);
    let qoute = arguments[2];
    let resourceLocation = arguments[3];
    resourceLocation = genValidAbsUrl(resourceLocation);
    let unitReplacedStr = ` ${arguments[1]}=${qoute}${resourceLocation}${qoute}`;
    return unitReplacedStr;
});

console.log(replacedInnerText);
