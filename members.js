const path = require('path');

// 처음 페이지는 로그인 페이지로 이동
exports.landing = (req, res) => {
  console.log('유저가 login page에 접속하였습니다!');
  res.sendFile(path.join(__dirname + '/client/views/login/index.html'))
}

// 회원 가입 route
exports.signup = (req, res) => {
  if(req.method == 'POST') {
    const id = req.body.id;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    const sql = 'insert into members (id, email, password1, password2) values (?, ?, ?, ?)';

    const params = [id, email, password1, password2];

    const query = db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        console.log('회원 가입에 성공하였습니다.');
        res.redirect('/')
      }
    })
  } else {
    console.log('회원 가입 페이지에 접속합니다.');
    res.redirect('/');
  }

  // if(password1 === password2) {
  //   bcrypt.hash(password1, null, null, (err, hash) => {
  //     const sql = 'insert into members (id, email, password1) values (?,?,?)';
  //     const params = [id, email, hash];
  //     con.query(sql, params, (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send('error');
  //       }
  //       console.log('회원 가입에 성공하셨습니다!');
  //       res.redirect('/')
  //     })
  //   })
  // }
}

// 로그인 route
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/views/login/index.html'))
// })
