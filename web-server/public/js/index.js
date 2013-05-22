require('boot');
var pomelo = window.pomelo;
$(document).ready(function(){
	//login
	$("#login-submit-btn").click(check_login);
	$("#goto-register-a").click(enter_register);
	$("#register-submit-btn").click(send_register);
	$("#goto-login-a").click(enter_login);
	var host = "172.26.14.222";
	var port = "3010";
	pomelo.init({
    	host: host,
    	port: port,
    	log: true
  	},function(){
		Pomelo.init();
  	});
});

function enter_login(){
	$("#login-screen").css({"display":"block"});
	$("#login-screen").animate({opacity:"1"},500);
	$("#register-screen").animate({opacity:"0"},500,function(){
		$("#register-screen").css({"display":"none"});
	});
}
function check_login(){
	var account = $("#login-account").val();
	var password = $("#login-password").val();
	if(account.length<6){
		return;
	}
	if(password.length<6){
		return;
	}
	$.ajax({
		url:"/check_login/"+account+"/"+password,
		type:"get",
		dataType:"json",
		cache:false,
		success:function(data){
			if(data.result == "success"){
				Pomelo.login(account,password);
			}
			else{

			}
		},
		error:function(){
			alert("connect fail");
		}
	});
}
function enter_register(){
	$("#register-screen").css({"display":"block"});
	$("#register-screen").animate({opacity:"1"},500);
	$("#login-screen").animate({opacity:"0"},500,function(){
		$("#login-screen").css({"display":"none"});
	});
}
function send_register(){
	var account = $("#register-account").val();
	var password = $("#register-password").val();
	var name = $("#register-name").val();
	if(account.length<6){
		return;
	}
	if(password.length<6){
		return;
	}
	if(name == ""){
		return;
	}
	$.ajax({
		url:"/add_user",
		type:"post",
		dataType:"json",
		cache:false,
		data:{
			account:account,
			password:password,
			name:name
		},
		success:function(data){
			if(data.result == "success"){
				Pomelo.register(account,password);
			}
			else{

			}
		},
		error:function(){
			alert("connect fail");
		}
	});
}

var Pomelo = {
	self : null,
	canvas : null,
	cxt : null,
	image : null,
	init : function(){
		this.self = pomelo;
		//准备好图片
		var canvas = document.getElementById("my-canvas");
		var cxt = canvas.getContext("2d");
		var image = new Image();  
		image.src = "../image/bone.png";
		image.onload = function(){
			Pomelo.canvas = canvas;
			Pomelo.cxt = cxt;
			Pomelo.image = image;
		}

		//加好监听
		pomelo.on("onAdd",function(data){
			Pomelo.addBone(data.user);
		});
		pomelo.on("onInitBone",function(data){
			Pomelo.initBone(data.user);
		});
	},
	login : function(account,password){
		pomelo.request("connector.entryHandler.login",{account:account,password:password},function(info){
			if(info.msg == "duplicate"){
				alert("you have login duplicately");
			}
			else if(info.msg == "success"){
				$("#game-screen").css({"display":"block"});
				$("#game-screen").animate({opacity:"1"},500);
				$("#login-screen").animate({opacity:"0"},500,function(){
					$("#login-screen").css({"display":"none"});
				});
				$("#bg-canvas").attr("user",account);
				pomelo.request("game.gameHandler.initBone",{uid:account+"&"+password,sid:info.sid});
			}
		});
	},
	register : function(account,password){
		pomelo.request("connector.entryHandler.login",{account:account,password:password},function(info){
			if(info.msg == "success"){
				$("#game-screen").css({"display":"block"});
				$("#game-screen").animate({opacity:"1"},500);
				$("#register-screen").animate({opacity:"0"},500,function(){
					$("#register-screen").css({"display":"none"});
				});
				$("#bg-canvas").attr("user",account);
				pomelo.request("game.gameHandler.initBone",{uid:account+"&"+password,sid:info.sid});
			}
		});
	},
	initBone : function(user){
		var account = $("#bg-canvas").attr("user");
		if(account != user.account){
			var bone = new Bone({
				account : user.account,
				name : user.name,
				x : user.x,
				y : user.y,
				img : this.image,
				cxt : this.cxt
			});
			bone.init(this.cxt);
		}
	},
	addBone : function(user){
		var bone = new Bone({
			account : user.account,
			name : user.name,
			x : user.x,
			y : user.y,
			img : this.image,
			cxt : this.cxt
		});
		bone.init(this.cxt);
		var account = $("#bg-canvas").attr("user");
		if(account == user.account){
			bone.addListener(this.canvas);
		}
	}
};