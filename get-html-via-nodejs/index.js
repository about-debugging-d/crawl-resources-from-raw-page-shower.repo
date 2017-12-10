const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();


const port = 57777;

app.get('/:distUrl', function(req, res){
    let url = req.path.replace(/^\//, '');
    url = decodeURIComponent(url);
    console.log(url);
    request(url, function (error, response, body) {
        if (error) console.log('error:', error);
        res.send(body);
    });
});

~function () {
    console.log(`get-html nodejs server started successed, listening at ${port}, the path of the request must be a string encoded by encodeURIComponent function from a valid uri string`);
}();

app.listen(port);

