const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
require('dotenv').config(); // enables loading .env vars
const path = require('path');
const cors = require('cors');
 
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Initiating Magic instance for server-side methods
// Allow requests from client-side
app.use(cors({ origin: process.env.CLIENT_URL }));  

app.use("/user", userRouter);

//'mongodb+srv://manai:Azerty12345@cluster0.jfqne.mongodb.net/LoginUsers';
const CONNECTION_URL = 'mongodb+srv://manai:Azerty12345@cluster0.jfqne.mongodb.net/LoginUsers';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);