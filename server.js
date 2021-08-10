const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

//assets
app.use(express.static(path.join(__dirname, 'public')))
//set template engine
// app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
  res.render('home');
})















app.listen(port,()=>{
  console.log(`listening on port ${port}`);
})