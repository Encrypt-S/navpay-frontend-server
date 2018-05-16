const express = require('express');
const serveStatic = require('serve-static')
const helmet = require('helmet')
const path = require('path')
const app = express();

// Rediects http to https
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(3001);

const PORT = process.env.PORT || 3000;

app.use(helmet())
app.use(serveStatic(path.join(__dirname, 'public'), {
  'setHeaders': setHeaders
}))

// Set header to force download
function setHeaders (res, path) {
  if (!path.includes('index.html')) {
    res.setHeader('Cache-Control', 'public, max-age=3600')
  }
}

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});