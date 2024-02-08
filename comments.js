//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = require('./comments');

var server = http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    if (url_parts.pathname == '/') {
        fs.readFile('index.html', function (err, data) {
            res.end(data);
        });
    }
    else if (url_parts.pathname.substr(0, 9) == '/comment/') {
        var comment = unescape(url_parts.pathname.substr(9));
        comments.add(comment, function () {
            res.end();
        });
    }
    else if (url_parts.pathname == '/get') {
        comments.get(function (data) {
            res.end(data);
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
});

server.listen(8080);
