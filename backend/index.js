const express = require('express')
const app = express()

const mongoDB = require('./db');
require('dotenv').config();

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin",process.env.REACT_APP_FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  next();
})
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(process.env.REACT_APP_API_URL, require("./Routes/CreateUser"))
app.use(process.env.REACT_APP_API_URL, require("./Routes/DisplayFood"))
app.use(process.env.REACT_APP_API_URL, require("./Routes/OrderData"))
console.log(process.env.REACT_APP_BACKEND_PORT)
app.listen(process.env.REACT_APP_BACKEND_PORT, () => {
  console.log(`Example app listening on port`)
})