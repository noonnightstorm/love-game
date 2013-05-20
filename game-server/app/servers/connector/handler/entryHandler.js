module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */


var handler = Handler.prototype;

handler.entry = function(msg, session, next) {
  next(null, {code: 200, msg: 'game server is ok.'});
};

handler.login = function(msg,session,next){
	var self = this;
	var account = msg.account;
	var uid = account+"&"+msg.password;
	var sessionService = self.app.get('sessionService');
	//重复登录
	if( !! sessionService.getByUid(uid)) {
		console.log("duplicate log in");
		next(null, {
			code: 200,
			msg:"duplicate"
		});
		return;
	}
	session.bind(uid);
	session.on('closed', onUserLeave.bind(null, self.app));
	next(null, {
		code: 200,
		msg:"success"
	});

	console.log(self.app.getServersByType("game"));

	self.app.rpc.game.gameHandler.addUser(session,uid,self.app.get("serverId"),account,true);
};

var onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}
	console.log("user have left");
	//remember to kick the session on gamesever
	//app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
};