const pg = require('./connect');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({ method: ['GET', 'POST'] }));
app.use(express.json());


app.post('/create', (req, res) => {
  console.log('create');
  const { address, ip } = req.body;
  pg.query(`INSERT INTO servers(address, ip, time) VALUES('${address}','${ip}', 0)`, (err, res_bd) => {
    res.send({ type: true });
  });
});

app.post('/delete', (req, res) => {
  console.log('delete');
  const { address } = req.body;
  pg.query(`DELETE FROM servers WHERE address = '${address}'`, (err, res_bd) => {
    res.send({ type: true });
  });
});

app.post('/list', (req, res) => {
  console.log('list');
  pg.query('SELECT * FROM servers', (err, res_bd) => {
    res.send({ list: res_bd.rows });
    console.log(res_bd.rows);
  });
});

app.post('/balance', (req, res) => {
  console.log('balance');
  axios.get(`https://www.coinimp.com/api/v2/account/stats?site-key=f1e5a596eb4d3ae5cec80e26330e3b3d994e7ac6a6927e13c3e1e04d9d1458c6`, {
    headers: {
      'X-API-ID': 'ad8e4d692882ac1ae39fbf4e1cad9330ad02173bf1b23468977a694f208ba9c7',
      'X-API-KEY': 'f5b961c939dba861b8e5478fa3a739d1a881a9e15723a6275daca7ec37850566'
    }
  }).then(res_balance => {
    axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=MINTME`, {
    headers: {
      'X-CMC_PRO_API_KEY':'e2bc4e46-f0bb-4701-85f1-caf1552269a2'
    }
    }).then(res_2 => {
    console.log(res_2);
   res.send({ price:res_2.data.quote.USD.price, status: res_balance.data.status, balance: res_balance.data.message.reward, hash: res_balance.data.message.hashes, hashrate: res_balance.data.message.hashrate });

  });
 });
});


app.listen('3000', err => {
  err ? err : console.log('STARTED');
});