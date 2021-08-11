// express
const express = require('express');
const app = express();
const path = require('path');

// mysql 연동
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234'
});

// mysql에 연결
connection.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected!!');

  // mysql 데이터 베이스 생성 및 연결 (접속)
  // connection.query('CREATE DATABASE express_db', (err, result) => {
  //   console.log('database created!!');
  // });

  // 테이블 생성
  // const sql = 'create table users(id int not null primary key auto_increment, name varchar(255) not null, email varchar(255) not null, email varchar(255) not null';
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log('table created!!')
  // });
});


// 처음 페이지는 로그인 페이지로 이동
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/views/login/index.html'))
});
// express에서 css 적용
app.use('/css', express.static(__dirname+'/client/css/'))

// port
const port = 5500;
app.listen(port, () => console.log(`listening on ${port}!!`));