/*$(document).ready(function(){
	$("#check-login-btn").click(sendReq);
	var host = "127.0.0.1";
	var port = "3010";
	var pomelo = window.pomelo;
	pomelo.init({
		host: host,
		port: port,
		log: true
	});
});
function sendReq(){
	var account = $("#login-account").val();
	var password = $("#login-password").val();
	if(account.length<6){
		$("#login-account").css({
			"border-color": "#b94a48",
			"-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
			"-moz-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
			"box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)"
		});
		return ;
	}
	if(password.length<6){
		$("#login-password").css({
			"border-color": "#b94a48",
			"-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
			"-moz-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
			"box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)"
		});
		return ;
	}
	$.ajax({
		url:"/check_login/"+account+"/"+password,
		dataType:"json",
		type:"get",
		cache:false,
		success:function(data){
			if(data.result == "success"){
				pomelo.request("connector.entryHandler.login",{account:account,password:password});
				window.location.href = "/game/"+account+"/"+password;
			}
			else{
				$("#login-password").css({
					"border-color": "#b94a48",
					"-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
					"-moz-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
					"box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)"
				});
			}
		},
		err:function(){
			alert("发送失败");
		}
	});
}*/
require('boot');
var pomelo = window.pomelo;
$(document).ready(function(){
	//login
	$("#login-submit-btn").click(check_login);
	$("#goto-register-a").click(enter_register);
	$("#register-submit-btn").click(send_register);
	$("#goto-login-a").click(enter_login);
	var host = "127.0.0.1";
	var port = "3010";
	pomelo.init({
    	host: host,
    	port: port,
    	log: true
  	},function(){
  		if(pomelo){
  			Pomelo.self = pomelo;
  		}
  	});
	//画骨头
	/*var canvas = document.getElementById("my-canvas");
	var cxt = canvas.getContext("2d");
	var image = new Image();  
	image.src = "../image/bone.png";
	image.onload = function(){
		var bone = new Bone({img:image,cxt:cxt});
		bone.init(cxt);
		bone.addListener(canvas);
	}*/
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
			}
		});
	},
	register : function(){
		//remember to finish
		pomelo.request("",{},function(){

		});
	},
	initBones : function(){
		pomelo.request("connector.entryHandler.initBones",{});
	}
};