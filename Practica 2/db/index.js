const basic = require('./basicConnection');
const pool = require('./poolConnection');
const promise = require('./promiseConnection');

function getDBConnection(mode = 'promise') {
  switch (mode) {
    case 'basic':
      return basic;
    case 'pool':
      return pool;
    default:
      return promise;
  }
}

module.exports = getDBConnection;