require('newrelic');
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.get('/:id/reservations', (req, res) => {
  // console.log("i am inside of get")
  const resID = Number(req.params.id);
  axios.get(`http://54.215.236.80:3020/${resID}/reservations`)
  .then(response => {
    res.status(200).send(response.data);
  })
  .catch(error => {
    res.status(500).send();
  })
});



app.listen(3000, () => {
  console.log('Open Table proxy server listening on port 3000!');
});
