const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');
require('dotenv').config()

const appPort = parseInt(process.env.PORT || 8000); 

const app = express()
app.use(cors())

// app.all("*", (req, res, next) => {
//   console.log("REQUEST", req.url); 
//   next();
// });

const proxy = httpProxy.createProxyServer({});

app.all('/api/*', (req, res) => {
  proxy.web(req, res, { target: process.env.API_URL });
})

app.all('/', (req, res) => {
  proxy.web(req, res, { target: process.env.GANACHE_URL });
})

app.listen(appPort, '0.0.0.0', () => console.log(`App listening on port ${appPort}...`))