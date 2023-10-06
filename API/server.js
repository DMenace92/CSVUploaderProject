const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors');
const csvRouter = require('./routes/csvUpload')
require('./config/db')

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(csvRouter)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())




app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}!`);
});
