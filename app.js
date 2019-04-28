var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
const giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', { name });
})

// ROUTES
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/', (req, res) => {
  console.log(req.query) // => "{ term: hey" }
  res.render('home')
})

app.get('/', (req, res) => {
   giphy.search(req.query.term, (err, response) => {
     const gifs = response.data;
     res.render('home', { gifs })
   });
 });

 app.get('/hello-gif', function (req, res) {
   res.render('hello-gif', {url: 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'})
 });

 app.listen(3000, function () {
   console.log('Gif Search listening on port localhost:3000!');
 });
