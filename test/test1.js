const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));

// app.set('views', __dirname + '/client/');
// // html을 ejs로 변환
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.set('view engine','ejs');
// app.use(express.static(__dirname + '/views/'));



// app.use('/css', express.static(__dirname + '/client/main/css/'));
// app.use('/js', express.static(__dirname + '/client/main/js'));
// app.get('/', (req, res) => {
//   // app.use(express.static(__dirname + '/views/main/'));
//   res.render('index copy');
// });

// app.use(express.static(path.join(__dirname, '/public/images')))

app.get('/', (req, res) => {
  app.use(express.static(__dirname + '/views/'));
  res.render('main');
});



// app.get('/icons', (req, res) => {
//   fs.readFile('02d.png', (err, data) => {
//     res.writeHead(200, { 'Content-Type':'text/html' });
//     res.end(data);
//   })
// })

const port = 4000;
app.listen(port, () => {
  console.log(`listening on ${port}!!`);
})