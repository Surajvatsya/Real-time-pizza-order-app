require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
//Database connection
mongoose.connect('mongodb://localhost:27017/pizza', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connection established');
  })
  .catch((err) => { console.log(err); })
  ;

//session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
})
//session config(middleware)
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }//24hr
}))

app.use(flash());



//assets
app.use(express.static(path.join(__dirname, 'public')))
//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
require('./routes/web')(app);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})