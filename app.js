const http = require('http');
const httpProxy = require('http-proxy');
 
//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({});
 
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
const server = http.createServer((req, res) => {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  console.log("HI!")
  if (req.url.startsWith('/api')) {
    console.log("API")
    proxy.web(req, res, { target: 'http://privatehostedganache:10000' });
  } else {
    console.log("GANACHE")
    proxy.web(req, res, { target: 'http://privatehostedganache:8545' });
  }
  console.log("COMPLETE!")
});
 
console.log("listening on port 8000")
server.listen(8000, '0.0.0.0');
