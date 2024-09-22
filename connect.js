const Pool = require('pg').Pool;
const pg = new Pool({
  user:'qcwoweoo',
  password:'7YdvmEW1aZAIRPh9GGd3QmGwDxrBDwAg',
  host:'flora.db.elephantsql.com',
  port:5432,
  database:'qcwoweoo'
  });
pg.connect(err => err ? err : console.log('DATABASE CONNECT'));

module.exports = pg;