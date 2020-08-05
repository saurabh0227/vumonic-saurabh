/**********global variables**************/
ROOT_DIR = __dirname + '/';
ENVIRONMENT = 'local';
/****************************************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const vhost = require('vhost');
const app = express();
const router = express.Router();
const cors = require('cors');
const config = require('config');

app.options("*", cors());
app.use(cors({
  exposedHeaders: ['Content-Length', 'Access-Token'],
}));

const domain = require('./config/domain_route')();
for (let key of domain.domains) {
  app.use(vhost(key.domain_name, key.object));
}

app.use('/', router);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  res.setHeader('Access-Control-Expose-Headers', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/*****************************************/

/*****************************************/
mongooseObj = require(ROOT_DIR + 'config/connection').mongo_init();

const server = http.createServer(app);
server.listen(process.env.PORT || config.server.port, () => {
  console.log(`Express server listening on port ${config.server.port} environment: ${config.env}`);
});
module.exports = app;