

var passport = require('passport');
var express = require('express');
var mongoose=require('mongoose');
require('./db/Users');
require('./config/passport');

mongoose.connect('mongodb://heroku_nk6gw71c:84l2qdkd2n8l08soldehgj1a78@ds153845.mlab.com:53845/heroku_nk6gw71c');
//mongoose.connect('mongodb://localhost/kevinsshowtracker');
var bodyParser= require('body-parser');

var app = express();

var PORT = Number(process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./client'));
app.use(passport.initialize());
require('./api/routes')(app)

app.get('/', function(req,res){
      res.sendFile('/client/views/index.html',{root:__dirname});
});
app.listen(PORT, function(){
    console.log('Server is running on '+PORT);
});
