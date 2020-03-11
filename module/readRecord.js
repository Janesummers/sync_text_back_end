const msgResult = require('./msgResult');
const path = require('path');
const fs = require('fs');

let read = (req, resp) => {
  let filename = req.params.name;
  let data = fs.readFileSync(path.join(__dirname, `../static/${filename}.txt`), {
    encoding: 'utf8'
  });
  resp.json(msgResult.msg(data));
}

module.exports = {
  read
}