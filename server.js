require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({ method: ['GET', 'POST'] }));
app.use(express.json());

app.post('/balance', (req, res) => {
  axios.get(`https://www.coinimp.com/api/v2/account/stats?site-key=${process.env.SITE_KEY}`, {
    headers: {
      'X-API-ID': process.env.X_API_ID,
      'X-API-KEY': process.env.X_API_KEY
    }
  }).then(res_balance => {
    axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=MINTME`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY
      }
    }).then(res_2 => {
      res.send({ price: res_2.data.data.MINTME[0].quote.USD.price, status: res_balance.data.status, balance: res_balance.data.message.reward, hash: res_balance.data.message.hashes, hashrate: res_balance.data.message.hashrate });
    });
  });
});


app.listen('3000', err => {
  err ? err : console.log('STARTED');
});