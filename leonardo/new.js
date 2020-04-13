var express = require('express');
var app = express();
    app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/new.html');
});


/*
app.get('/public/css/style.css', (req,res) => {
    res.sendFile(__dirname + '/public/css/style.css');
});

*/


app.listen(3000, (req, res) => {

});