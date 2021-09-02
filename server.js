const express = require('express');                  // express 서버
const session = require('express-session');          // express 서버 세션
const MySQLStore = require('express-mysql-session')(session);  

// html에 있는 값을 받아오기 위해 사용 - 회원 가입 및 로그인
const bodyParser = require('body-parser');          // body-parser

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// 회원 비밀번호 암호화
const bcrypt = require('bcrypt-nodejs');

// aws
const config = require('./config/dev');

const mysql = require('mysql');     // mysql 연동
const con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});
con.connect((err) => {    //  mysql에 연결
  if (err) throw err;     // 만약 err가 있으면 에러를 콘솔창에 출력
  console.log('Mysql Connected!!'); // mysql과 연결이 되면 console에 출력
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({   // 세션 
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  })
}));

///////////////////////////////// page 관련 /////////////////////////////////
app.set('views', __dirname + '/client/views/');
// html을 ejs로 변환
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// express에서 css 적용
app.use('/css', express.static(__dirname + '/client/views/login/css/'));
app.use('/css', express.static(__dirname + '/client/views/main/css/'));
app.use('/css', express.static(__dirname + '/client/views/signup/css/'));

// js 적용
app.use('/js', express.static(__dirname + '/client/views/login/js'));
app.use('/js', express.static(__dirname + '/client/views/main/js'));
app.use('/js', express.static(__dirname + '/client/views/signup/js'));

///////////////////////////////// landing page /////////////////////////////////
app.get('/', (req, res) => {
  // if (!req.session.nickname) {
  //   res.redirect('/login');
  // } else {
  //   res.redirect('/welcome');
  // }
  res.redirect('/login');
});

app.get('/welcome', (req, res) => {
  // if (req.session.displayName) {
  //   res.render('main/index.html');
  // } else {
  //   res.redirect('/login');
  // }
  res.render('main/index.html');;
})

//////////////////////////////////////// 회원 가입 /////////////////////////////////////////
app.get('/signup', (req, res) => {
  console.log('회원 가입 페이지에 접속합니다.');
  res.render('signup/index.html');
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

//////////////////////////////////////// 로그인 /////////////////////////////////////////
app.get('/login', (req, res) => {
  console.log('로그인 페이지로 이동합니다.');
  res.render('login/index.html');
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
      res.redirect('/welcome');
    }
  });

  // const user_id = req.body.user_id;
  // const user_password = req.body.user_password1;

  // const sql = 'select id, password1 from members where id = ? and password1 = ?';
});

//////////////////////////////////////// 로그아웃 /////////////////////////////////////////
app.get('/logout', (req, res) => {
  delete req.session.displayName;
  req.session.save(() => {
    res.redirect('/welcome')
  })
})

//////////////////////////////////// port ////////////////////////////////
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));