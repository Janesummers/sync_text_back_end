const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.disable('x-powered-by');

// nohup node ./module/text_app.js &!

app.all('*', (req, resp, next) => {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', '*');
  resp.header('Access-Control-Allow-Methods', '*');
  if (req.method.toLowerCase() === 'options')
    resp.send(200);
  else
    next();
});

const writeRecord = require('./writeRecord');

app.all('/', (req, resp) => {
  console.log('首次写')
  writeRecord.write(req, resp);
})

app.post('/write', (req, resp) => {
  writeRecord.write(req, resp);
})

const readRecord = require('./readRecord');

app.get('*', (req, resp) => {
  console.log('req', req.params[0])
  resp.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  if (/[\.js|\.css|\.json|\.out]$/.test(req.params[0])) {
    const file = req.params[0].replace(/\/(.*)/, '$1')
    const result = readFileFn(file)
    resp.end(result)
  } else {
    resp.status(404).end('什么也没有')
  }

app.all('/:name', (req, resp) => {
  console.log('读')
  readRecord.read(req, resp);
})



app.listen(8889, () => {
  console.log('ok')
})