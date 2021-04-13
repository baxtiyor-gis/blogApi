const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./middleware/db');
const app = express();



app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/categories/', require('./routes/categoryRouter'));
app.use('/api/blogs', require('./routes/blogRouter'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
