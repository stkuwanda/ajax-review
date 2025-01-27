// server to serve index.html page of the TV Show Search App
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));

function get(res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function error(res, code) {
  res.statusCode = code;
  res.end(http.STATUS_CODES[code]);
}

http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    get(res);
    return;
  }

  error(res, 404);
}).listen(8080, function () {console.log('Server running on PORT: 8080...')});
