const pg = require('./pg');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({method:['GET','POST']}));
app.use(express.json());


app.post('/create', (req, res) => {
  const {address, ip} = req.body;
  pg.query(`INSERT INTO servers(address, ip, time) VALUES('${adress}','${ip}', 0)`, (err, res_bd) => {
    res.send({ type:true });
  });
});

app.post('/delete', (req, res) => {
  const {address} = req.body;
  pg.query(`DELETE FROM servers WHERE address = '${address}'`, (err, res_bd) => {
    res.send({type:true});
  });
});

app.post('/list', (req, res) => {
  pg.query('SELECT * FROM servers', (err, res_bd) => {
    res.send({ list: res.rows });
  });
});

app.post('/balance', (req, res) => {
  axios.get(`https://www.coinimp.com/api/v2/account/stats?site-key=f1e5a596eb4d3ae5cec80e26330e3b3d994e7ac6a6927e13c3e1e04d9d1458c6`, {
    method: 'GET',
    headers: {
      'X-API-ID': 'ad8e4d692882ac1ae39fbf4e1cad9330ad02173bf1b23468977a694f208ba9c7',
      'X-API-KEY': 'f5b961c939dba861b8e5478fa3a739d1a881a9e15723a6275daca7ec37850566'
    }
  }).then(res_balance => {
    res.send({ status: res_balance.status, balance: res_balance.message.reward, hash: res_balance.message.hashes, hashrate: res_balance.message.hashrate});
  });
});


app.listen('3000', err =>{
  err ? err : console.log('STARTED');
});