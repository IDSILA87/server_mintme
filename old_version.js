const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const app = express();


const all_address = JSON.parse(fs.readFileSync('all_adress.txt', 'utf8'));
console.log(all_address);

app.use(cors({ method: ['GET', 'POST'] }));
app.use(express.json());


app.post('/error', (req, res) => {
  console.log(req.body);
  res.send({ type: true });
});


app.post('/create', (req, res) => {
  console.log('create');
  const { address } = req.body;
  console.log(address);
  if (all_address.indexOf(address) != -1) {
    all_address.push(address);
    console.log(all_address);
    all_address.push(address);
    writeFileSync('all_adress.txt', JSON.stringify(all_address));
    res.send({ type: true });
  }
});

app.post('/delete', (req, res) => {
  console.log('delete');
  const { address } = req.body;
  all_address.splice(all_address.indexOf(address), 1);
  writeFileSync('all_adress.txt', JSON.stringify(all_address));
  res.send({ type: true });

});

app.post('/list', (req, res) => {
  console.log('list');
  res.send({ list: all_address });
});

app.post('/balance', (req, res) => {
  axios.get(`https://www.coinimp.com/api/v2/account/stats?site-key=`, {
    headers: {
      'X-API-ID': '',
      'X-API-KEY': ''
    }
  }).then(res_balance => {
    axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=MINTME`, {
      headers: {
        'X-CMC_PRO_API_KEY': ''
      }
    }).then(res_2 => {
      res.send({ price: res_2.data.data.MINTME[0].quote.USD.price, status: res_balance.data.status, balance: res_balance.data.message.reward, hash: res_balance.data.message.hashes, hashrate: res_balance.data.message.hashrate });
    });
  });
});



app.get('/sleep', (req, res) => {
  res.send({ type: 200 });
});

app.listen('3000', err => {
  err ? err : console.log('STARTED');
});