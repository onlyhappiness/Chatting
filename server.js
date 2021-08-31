const express = require('express');         // express
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const bodyParser = require('body-parser');    // body-parser
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt-nodejs');

const mysql = require('mysql');     // mysql 연동
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

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 * 24 * 90 }
}));

app.set('views', __dirname + '/client/views/');
// html을 ejs로 변환
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// express에서 css 적용
// app.use('/css', express.static('./static/css'));
app.use('/css', express.static(__dirname + '/client/views/login/css/'));
app.use('/css', express.static(__dirname + '/client/views/main/css/'));
app.use('/css', express.static(__dirname + '/client/views/signup/css/'));

// js 적용
app.use('/js', express.static(__dirname + '/client/views/login/js'));
app.use('/js', express.static(__dirname + '/client/views/main/js'));
app.use('/js', express.static(__dirname + '/client/views/signup/js'));

// landing page
app.get('/', (req, res) => {
  if (!req.session.nickname) {
    res.redirect('/login');
  } else {
    res.redirect('/welcome');
  }
});

app.get('/welcome', (req, res) => {
  if (!req.session.name) {
    return res.redirect('/login');
  } else {
    res.render('main/index.html');
  }
})

// 회원 가입
app.get('/signup', (req, res) => {
  console.log('회원 가입 페이지에 접속합니다.');
  res.render('signup/index.html');
  //res.sendFile(path.join(__dirname + '/client/views/signup/index.html'));
});

app.post('/signup', (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const nickname = req.body.nickname;
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  const sql = 'insert into members (id, email, nickname, password1, password2) values (?,?,?,?,?)';

  const params = [id, email, nickname, password1, password2];

  const query = con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Success!!');
      res.redirect('/login')
    }
  });
});

// 로그인
app.get('/login', (req, res) => {
  console.log('로그인 페이지로 이동합니다.');
  res.render('login/index.html')
  //res.sendFile(path.join(__dirname + '/client/views/login/index.html'));
});

app.post('/login', (req, res) => {
  const session = req.session;

  const user_id = req.body.user_id;
  const user_password = req.body.user_password1;

  const sql = 'select id, password1 from members where id = ? and password1 = ?';

  const params = [user_id, user_password];

  const query = con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('메인페이지로 이동합니다.');
      console.log(req.session);
      res.redirect('/');
    }
  });
});

// port
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));