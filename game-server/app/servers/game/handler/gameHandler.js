module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};


var handler = Handler.prototype;

handler.addUser = function(uid,sid,name,flag){
	console.log("test");
}
