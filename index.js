var finalhandler = require('finalhandler');
var fs = require('fs');
var http2 = require('http2');
var Router = require('router');
var cors = require('cors');

var router = new Router();

router.use(cors());

router.get('/', function (req, res) {
  console.log(req.headers);
  res.setHeader('Content-type', 'text/html');
  return res.end('<h1>Hello, Secure World!</h1>');
});

var options = {
  key: fs.readFileSync('./certificate/localhost.key'),
  cert: fs.readFileSync('./certificate/localhost.crt')
};

var port = process.env.VCAP_APP_PORT || 8080;
http2.createServer(options, app).listen(port);

function app(req, res) {
  router(req, res, finalhandler(req, res));
}

