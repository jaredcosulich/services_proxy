const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');

const appPort = process.env.PORT || 8000; 

const app = express()
app.use(cors())

app.all("*", (req, res, next) => {
  console.log("REQUEST", req.url); // do anything you want here
  next();
});

const proxy = httpProxy.createProxyServer({});

app.get('/api/*', (req, res) => {
  proxy.web(req, res, { target: 'http://privatehostedganache:10000' });
})

app.get('/', (req, res) => {
  proxy.web(req, res, { target: 'http://privatehostedganache:8545' });
})

app.listen(appPort, '0.0.0.0', () => console.log(`App listening on port ${appPort}...`))