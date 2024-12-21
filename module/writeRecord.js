const fs = require('fs');
const path = require('path');
const msgResult = require('./msgResult');
const qs = require('qs');

let write = (req, resp) => {
  let param = null
  if (req.method == "POST") {
    param = req.body;
  } else{
    param = req.query || req.params; 
  }
  let id = req.query.id;
  let data = qs.parse(param).data;
  let files = fs.readdirSync(path.join(__dirname, '../static'));

  if (id) {
    fs.writeFileSync(path.join(__dirname, `../static/${id}.txt`), data);
    resp.json(msgResult.msg('ok'));
  } else {
    let filename = `${randomName()}.txt`;
    while (files.includes(filename)) {
      filename = `${randomName()}.txt`;
    }
    fs.writeFileSync(path.join(__dirname, `../static/${filename}`), '');
    resp.json(msgResult.msg(filename.match(/.+(?=\.)/)[0]));
  }
  // resp.redirect(302, `/${filename}`);
}

let create = (req, resp) => {
  let files = fs.readdirSync(path.join(__dirname, '../static'));
  let filename = `${randomName()}.txt`;
  while (files.includes(filename)) {
    filename = `${randomName()}.txt`;
  }
  fs.writeFileSync(path.join(__dirname, `../static/${filename}`), '');
  resp.json(msgResult.msg(filename.match(/.+(?=\.)/)[0]));
}

var randomName = () => {
  let name = '';
  let randomData = 'asdfghjklzxcvbnmqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890'.split('');
  let n = 0;
  while (n < 5) {
    let index = parseInt(Math.random() * 62);
    name += randomData[index];
    n++;
  }
  return name;
}

module.exports = {
  write,
  create
}