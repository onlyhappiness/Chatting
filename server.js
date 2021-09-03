const express = require('express');                  // express 서버
const session = require('express-session');          // express 서버 세션
const MySQLStore = require('express-mysql-session')(session);  

// html에 있는 값을 받아오기 위해 사용 - 회원 가입 및 로그인
const bodyParser = require('body-parser');          // body-parser

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// 회원 비밀번호 암호화
//const bcrypt = require('bcrypt-nodejs');

const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

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

///////////////////////////////// passport 설정 /////////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////// logout /////////////////////////////////
app.get("/logout", function (req, res) {
  req.logout();
  req.session.save(function () {
    res.redirect("/");
  });
});

///////////////////////////////// landing page /////////////////////////////////
app.get('/', (req, res) => {
  if (req.user && req.user.displayName) {
    res.render('main/index.html');
  } else {
    res.redirect('/login');
  }
});

///////////////////////////////// passport 설정 /////////////////////////////////
passport.serializeUser(function (user, done) {
  console.log("serializeUser", user);
  done(null, user.authId);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser", id);
  const sql = "SELECT * FROM users WHERE authId=?";
  con.query(sql, [id], function (err, results) {
    if (err) {
      console.log(err);
      done("There is no user.");
    } else {
      done(null, results[0]);
    }
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    const uname = username;
    const pwd = password;
    const sql = "SELECT * FROM users WHERE authId=?";
    con.query(
      sql,
      ["local:" + uname],
      function (err, results) {
        if (err) {
          return done("There is no user.");
        }
        const user = results[0];
        return hasher(
          { password: pwd, salt: user.salt },
          function (err, pass, salt, hash) {
            if (hash === user.password) {
              console.log("LocalStrategy", user);
              done(null, user);
            } else {
              done(null, false);
            }
          }
        );
      }
    );
  })
);

//////////////////////////////////////// 로그인 /////////////////////////////////////////
app.get('/login', (req, res) => {
  console.log('로그인 페이지로 이동합니다.');
  res.render('login/index.html');
});

app.post('/login', passport.authenticate("local", {
  successRedirect: "/welcome",
  failureRedirect: "/login",
  failureFlash: false,
}));

//////////////////////////////////////// 회원 가입 /////////////////////////////////////////
app.get('/register', (req, res) => {
  console.log('회원 가입 페이지에 접속합니다.');
  res.render('register/index.html');
});

app.post('/register', (req, res) => {
  hasher(
    { password: req.body.password },
    function (err, pass, salt, hash) {
      const user = {
        authId: "local:" + req.body.username,
        username: req.body.username,
        password: hash,
        salt: salt,
        displayName: req.body.displayName,
      };
      const sql = "INSERT INTO users SET ?";
      con.query(
        sql,
        user,
        function (err, results) {
          if (err) {
            console.log(err);
            res.status(500);
          } else {
            req.login(user, function (err) {
              req.session.save(function () {
                res.redirect("/welcome");
              });
            });
          }
        }
      );
    }
  );
});

//////////////////////////////////// port ////////////////////////////////
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));