


var express = require('express');
var mongoose=require('mongoose');
require('./db/Users');


mongoose.connect('mongodb://localhost/movies');
var app = express();


app.use(express.static('./client'));

require('./api/routes')(app)

app.get('*', function(req,res){
      res.sendFile('/client/views/index.html',{root:__dirname});
});
app.listen(8080, function(){
    console.log('Server is running on 8080.');
});
