// express
const express = require('express');
const app = express();
const path = require('path');

// body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// mysql 연동
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'dbs'
});

//  mysql에 연결
con.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected!!');
});


// express에서 css 적용
app.use('/css', express.static(__dirname + '/client/css/'));
// app.use('/css', express.static('./static/css'));

// 처음 페이지는 로그인 페이지로 이동
app.get('/', (req,res) => {
  console.log('유저가 login page에 접속하였습니다!')
  res.sendFile(path.join(__dirname + '/client/views/login/index.html'))
});

// 회원 가입 route
app.get('/join', (req,res) => {
  console.log('유저가 join page에 접속하였습니다!')
  res.sendFile(path.join(__dirname + '/client/views/join/index.html'))
});

app.post('/join', (req, res, next) => {
  const body = req.body;
  const id = body.id;
  const email = body.email;
  const password =  body.password;

  con.query('insert into members (id, email, password) values (?,?,?)', [id, email, password], (err, rows, fields) => {
    if (!err) {
      res.send('successs');
    } else {
      res.send('err' + err);
    }
  });
});


// port
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));