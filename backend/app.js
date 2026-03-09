const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieparser = require('cookie-parser')
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieparser());



app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes)

module.exports = app;