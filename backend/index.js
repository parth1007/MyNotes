const express = require('express');
const app = express();
const port = 5000;
const connectToMongo = require('./database');
const router = express.Router();
const cors = require('cors');


connectToMongo();

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors());
app.use(express.json());


// backend/routes/auth.js
app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})