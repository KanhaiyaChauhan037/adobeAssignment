const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
     console.log('Connected to the database.');
}).catch((err) => {
     console.log('Cannot connect to the database.', err);
     process.exit();
});


// set up routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}.`);
});
