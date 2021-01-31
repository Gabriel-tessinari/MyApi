const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./src/routes/user.routes');
const characterRoute = require('./src/routes/character.routes');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('MongoDB connected.')
);

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/character', characterRoute);

app.listen(3000, () => console.log('Server running.'))