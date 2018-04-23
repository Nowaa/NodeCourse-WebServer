const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //default folder for partials
app.set('view engine', 'hbs'); // set the view engine to use hbs; views is the default folder  for templates

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// }); uncomment to render only maintenance

app.use(express.static(__dirname + '/public')); //dirname uses the name of whatever directory this file is in 


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
//   res.send('<h1>Here is a response</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the page managed by Handlebars.',
  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request'
  });
});

app.listen(3000, () => {
  console.log('Server up on port 3000');
});