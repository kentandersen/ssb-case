const { join } = require('path');
const { createServer } = require('http');

const connect = require('connect');
const serveStatic = require('serve-static');
const proxy = require('proxy-middleware');

const [,,port=8080] = process.argv;
const public = join(__dirname, 'public');
const dist = join(__dirname, 'dist');


function proxyTarget(targetUrl, headers) {
  const proxyOptions = parse(targetUrl);
  proxyOptions.headers = headers;
  return proxy(parse(proxyOptions));
}

const app = connect();
app.use(serveStatic(public));
app.use(serveStatic(dist));

console.log(`Server started on port ${port}`);
createServer(app).listen(port);
