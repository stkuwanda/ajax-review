// server to serve fetch.html page, create basic API end-points to call from client
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'public', 'fetch.html'));

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
