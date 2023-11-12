const express = require('express');
const http = require('http');
const request = require('request');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/login/oauth/.well-known/openid-configuration', (req, res) => {
  const url = 'https://github.com/.well-known/openid-configuration';
  req.pipe(request(url)).pipe(res);
});

app.use('/login/oauth', (req, res) => {
  const url = `https://github.com${req.url}`;
  req.pipe(request(url)).pipe(res);
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
