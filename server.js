

var passport = require('passport');
var express = require('express');
var mongoose=require('mongoose');
require('./db/Users');
require('./config/passport');


mongoose.connect('mongodb://localhost/movies');
var bodyParser= require('body-parser');

var app = express();

var port = Number(process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./client'));
app.use(passport.initialize());
require('./api/routes')(app)

app.get('*', function(req,res){
      res.sendFile('/client/views/index.html',{root:__dirname});
});
app.listen(PORT, function(){
    console.log('Server is running on'+PORT);
});
