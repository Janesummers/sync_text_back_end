let error = data => {
  return {
    code: 'error',
    data
  }
};

let msg = data => {
  return {
    code: 'ok',
    data
  }
};

module.exports = {
  error,
  msg
}