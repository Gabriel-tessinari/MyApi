const express = require('express');
const app = express();
const cors = require('cors');

const userRoute = require('./routes/user.routes');

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);

app.listen(3000, () => console.log('Server running.'))