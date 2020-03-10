
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const cors = require('cors');

//access env file
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>This is home</h1>')
})

// to do routes
app.use('/api/v1/todos', routes.todo);


app.listen(PORT, () =>
  console.log(`Server connected at http://localhost:${PORT}`)
);
