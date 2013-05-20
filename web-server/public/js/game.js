require('boot');
(function(){
	var canvas = document.getElementById("my-canvas");
	var cxt = canvas.getContext("2d");
	
	var pomelo = window.pomelo;
    var host = "127.0.0.1";
    var port = "3010";
    pomelo.init({
    	host: host,
    	port: port,
    	log: true
  	},connectInit(canvas,cxt));

})();

function connectInit(canvas,cxt){
	return function(){
		var image = new Image();  
		image.src = "/image/bone.png";
		image.onload = function(){
			//draw a bone
			/*var bone = new Bone({img:image,cxt:cxt});
			bone.init(cxt);
			bone.addListener(canvas);*/
			pomelo.request("connector.entryHandler.entry", "hello pomelo", function(data) {
		      console.log(data.msg);
		  	});
		}
	}
}