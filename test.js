const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(
  session
);
const bodyParser = require("body-parser");

const passport = require("passport");
const LocalStrategy =
  require("passport-local").Strategy;
//const FacebookStrategy =
  //require("passport-facebook").Strategy;

const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "rds-mysql.cunmn4wwmypl.ap-northeast-2.rds.amazonaws.com",
  user: "bumbum",
  password: "!87498c7885",
  database: "db",
});
conn.connect();

const app = express();
app.use( bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "rds-mysql.cunmn4wwmypl.ap-northeast-2.rds.amazonaws.com",
      user: "bumbum",
      password: "!87498c7885",
      database: "db",
    }),
  })
);

app.set('views', __dirname + '/client/views');

// html을 ejs로 변환
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/client/views/');
// html을 ejs로 변환
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// express에서 css 적용
app.use('/auth/css', express.static(__dirname + '/client/views/login/css/'));
app.use('/auth/css', express.static(__dirname + '/client/views/main/css/'));
app.use('/auth/css', express.static(__dirname + '/client/views/register/css/'));

// js 적용
app.use('/auth/js', express.static(__dirname + '/client/views/login/js'));
app.use('/auth/js', express.static(__dirname + '/client/views/main/js'));
app.use('/auth/js', express.static(__dirname + '/client/views/register/js'));


app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/logout", function (req, res) {
  req.logout();
  req.session.save(function () {
    res.redirect("/welcome");
  });
});

app.get("/welcome", function (req, res) {
  if (req.user && req.user.displayName) {
    // res.render('main/index.html');
    // res.send(`
    //   <h1>Hello, ${req.user.displayName}</h1>
    //   <a href="/auth/logout">logout</a>
    // `);
    res.render('main/index.html', { displayName: req.user.displayName});
  } else {
    res.redirect('/auth/login')
  }
});

passport.serializeUser(function (user, done) {
  console.log("serializeUser", user);
  done(null, user.authId);
});
passport.deserializeUser(function (id, done) {
  console.log("deserializeUser", id);
  const sql = "SELECT * FROM users WHERE authId=?";
  conn.query(sql, [id], function (err, results) {
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
    conn.query(
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

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/auth/login",
    failureFlash: false,
  })
);


app.post("/auth/register", function (req, res) {
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
      conn.query(
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

app.get("/auth/register", function (req, res) {
  res.render('register/index.html')
});

app.get("/auth/login", function (req, res) {
  res.render('login/index.html');
});

const port = 5500;
app.listen(port, function () {
  console.log(`Connected ${port}`);
});
