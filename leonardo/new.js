var express = require('express');
var bodyParser = require('body-parser');
var app = express();
    app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/new.html');
});

app.use(bodyParser());
//app.use(app.router);
/*
app.get('/public/css/style.css', (req,res) => {
    res.sendFile(__dirname + '/public/css/style.css');
});

*/

app.post('/user/namedisplay', (req,res)=> {

    res.send("HI "+req.body.name);

});

app.listen(3000, (req, res) => {

});