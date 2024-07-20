const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
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

app.get('/', (req, resp) => {
  console.log('首次写')
  writeRecord.write(req, resp);
})

app.post('/write', (req, resp) => {
  writeRecord.write(req, resp);
})

const readRecord = require('./readRecord');

app.all('/:name', (req, resp) => {
  console.log('读')
  readRecord.read(req, resp);
})



app.listen(8889, () => {
  console.log('ok')
})