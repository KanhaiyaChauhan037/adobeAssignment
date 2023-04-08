const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});

module.exports = app;
