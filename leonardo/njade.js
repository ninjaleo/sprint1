var express = require('express');

var app = express();

app.use(express.static('public'));

app.set('view engine', 'jade');

app.get('/', (req, res) => {
   // res.render('newjade');

    res.render('newjade', { title : 'my express with jade', message: 'hellow express world'});
});

app.listen(3000, (req, res) => {

});