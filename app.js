const http = require('http');
const httpProxy = require('http-proxy');
 
const proxy = httpProxy.createProxyServer({});
 
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api')) {
    proxy.web(req, res, { target: 'http://privatehostedganache:10000' });
  } else {
    proxy.web(req, res, { target: 'http://privatehostedganache:8545' });
  }
});
 
console.log("listening on port 8000")
server.listen(8000, '0.0.0.0');
