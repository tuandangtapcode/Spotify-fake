const express = require('express');
const dotev = require('dotenv');
dotev.config();
const cors = require('cors');
const app = express();
const routes = require('./routes/index');

// Connect DB
const db = require('./config');
db.connect();

app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});