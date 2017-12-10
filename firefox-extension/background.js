/*
Open a new tab, and load "my-page.html" into it.
*/
// function handleClick() {

console.log("injecting");

function directGithubRaw(tabs) {
    console.log(`the typeof argument[0] is ${ typeof arguments[0]}`);
    console.log(`the argument[0] is ${arguments[0]}`);
    const originUrl = tabs[0];
    console.log(`the originUrl in directGithubRaw function is ${originUrl}, right?`);
    // console.log(`${}`);
    const trueHtmlUrl = `http://iocss.cc/${encodeURIComponent(originUrl)}`;
    // const trueHtmlUrl = `http://iocss.cc/${originUrl}`;
    console.log(`the trueHtmlUrl in directGithubRaw function is ${trueHtmlUrl}, right?`);
    browser.tabs.update(tabs[0].id, {url: trueHtmlUrl});
}

// function genCurTabInfo() {
//     const queryingCurTab = browser.tabs.query({currentWindow: true, active: true});
//     return queryingCurTab.then((tabs) => {
//         console.dir(tabs);
//         console.log(`Above is the tabs , right?`);
//         const cachedCurTabObj = tabs[0];
//         const curUrl = cachedCurTabObj.url;
//         const lastAccessed = cachedCurTabObj.lastAccessed;
//         const id = cachedCurTabObj.id;
//         if (githubusercontentLastAccessDatesObj[curUrl] == undefined) githubusercontentLastAccessDatesObj[curUrl] = [];
//         githubusercontentLastAccessDatesObj[curUrl].push(lastAccessed);
//         // count++;
//         return {
//             id,
//             curUrl,
//             lastAccessed,
//             count,
//             githubusercontentLastAccessDatesObj: githubusercontentLastAccessDatesObj[curUrl]
//         };
//     }, (err) => {
//         throw err
//     })
// }

const githubusercontentLastAccessDatesObj = {};
let count = 0;
browser.browserAction.onClicked.addListener(function () {
    const queryingCurTab = browser.tabs.query({currentWindow: true, active: true});
    queryingCurTab.then((tabs) => {
        const cachedCurTabObj = tabs[0];
        const curUrl = cachedCurTabObj.url;
        const lastAccessed = cachedCurTabObj.lastAccessed;
        const id = cachedCurTabObj.id;
        console.log(`${lastAccessed}: ${id}`);
        if (githubusercontentLastAccessDatesObj[curUrl] == undefined) githubusercontentLastAccessDatesObj[curUrl] = [];
        githubusercontentLastAccessDatesObj[curUrl].push(lastAccessed);
        count++;
        return {
            id,
            curUrl,
            count,
            githubusercontentLastAccessDatesObj: githubusercontentLastAccessDatesObj[curUrl]
        };
    }, (err) => {
        throw err
    })
        .then(function (tabInfoObj) {
            const {curUrl, count, id} = tabInfoObj;
            console.log(`In then block's anonymous function scope, argument curUrl is ${curUrl}, right?`);
            if (/^https:\/\/raw.githubusercontent.com\/.*/.test(curUrl)) {
                console.log(`matched url is ${curUrl}, right?`);
                directGithubRaw([curUrl]);
                // } else if (  /https%3A%2F%2Fraw.githubusercontent.com/.test(curUrl) ) {
            } else if (/https%3A%2F%2Fraw.githubusercontent.com/.test(curUrl)) {
                console.log(`matched url is ${curUrl}, right?`);

                function messageTab() {
                    console.log(`If you can see this message, the messageTab function exectued.`);
                    const isOrigin = !!(count % 2);
                    console.log(`this is the isOrigin: ${isOrigin}, right?`);
                    // genCurTabInfo()
                    //     .then(function (tabInfoObj) {
                    //         const {curUrl, count, id, lastAccessed} = tabInfoObj;
                    //         console.log(`${lastAccessed}: ${id}`);
                            browser.tabs.sendMessage(id, {
                                isOrigin
                            });
                        // })
                }

                messageTab();
            }
        });
});


// browser.browserAction.onClicked.addListener(handleClick);
 
