// server to serve ajax.html page, create basic API end-points to call from client
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'public', 'ajax.html'));
const txt = fs.createReadStream(path.join(__dirname, 'public', 'sample.txt'));

function get(res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function getText(res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
  txt.pipe(res);
}

function error(res, code) {
  res.statusCode = code;
  res.end(http.STATUS_CODES[code]);
}

http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/sample.txt') {
    getText(res);
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    get(res);
    return;
  }

  error(res, 404);
}).listen(3000, function () {console.log('Server running on PORT: 3000...')});
