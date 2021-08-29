const express = require('express');
const { resolve } = require('path');

const app = express();

app.use('/',
  express.static(
    resolve(
      __dirname,
      './build'
    )
  )
)

app.list(process.env.PORT || 3000, err => {
  if (err) return console.log(err);

  console.log('Server on port: ', process.env.PORT);
})
