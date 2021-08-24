const express = require('express');         // express
const members = require('./members')
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

const app = express();
const mysql = require('mysql');     // mysql 연동
const bodyParser = require('body-parser');    // body-parser
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'dbs'
});

con.connect((err) => {    //  mysql에 연결
  if (err) throw err;
  console.log('Mysql Connected!!');
});

global.db = con;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 * 24 * 90 }
}));

// express에서 css 적용
// app.use('/css', express.static('./static/css'));
app.use('/css', express.static(__dirname + '/client/views/login/css'));
app.use('/css', express.static(__dirname + '/client/views/main/css'));
app.use('/css', express.static(__dirname + '/client/views/signup/css'));

app.get('/', members.landing);
app.get('/signup', members.signup);
//app.get('/login', members.login);

app.post('/signup', members.signup);
//app.post('/login', members.login);

// port
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));