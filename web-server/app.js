var express = require('express');
var app = express.createServer();
var router = require('./routes/router');
var db = require('../shared/db/db');

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('view options', {layout: false});
  app.set('basepath',__dirname + '/public');
});

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

/*app.get("/game/:account/:password",router.game);
app.get("/register",router.register);
app.get("/check_login/:account/:password",db.check_login);
app.post("/add_user",db.add_user);*/
app.get("/check_login/:account/:password",db.check_login);
app.post("/add_user",db.add_user);

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");

app.listen(3001);
