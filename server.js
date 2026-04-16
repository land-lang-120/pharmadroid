/* PharmaDroid — Dev Server */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3006;
const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.json':'application/json','.svg':'image/svg+xml','.png':'image/png',
  '.ico':'image/x-icon','.webmanifest':'application/manifest+json',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  const fp = path.join(__dirname, url);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache', 'Expires': '0',
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`PharmaDroid running -> http://localhost:${PORT}`));
