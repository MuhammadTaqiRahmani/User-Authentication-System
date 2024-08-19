const { createServer } = require('node:http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading the page');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } 
  else if (req.url === '/signin') {
    fs.readFile('./signin.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading the page');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } 
  else {
    const filePath = path.join(__dirname, req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      case '.ico':
        contentType = 'image/x-icon';
        break;
      case '.pdf':
        contentType = 'application/pdf';
        break;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// Server on Nodejs without using any external module except npm


