function Bone(options){
	this.name = options.name||"storm";
	this.account = options.account||"123456";
	this.x = options.x||100;
	this.y = options.y||100;
	this.width = options.width||64;
	this.height = options.height||64;
	this.time = null;
	this.init = function(){
		var self = this;
		Bone.prototype.cxt.drawImage(Bone.prototype.img,0,0,64,64,this.x,this.y,this.width,this.height);
		pomelo.on("onMove",function(data){
			if(self.account == data.account){
				self.go(self,data.direct_x,data.direct_y);
			}
		});
		pomelo.on("onLeave",function(data){
			if(self.account == data.account){
				console.log("begin to clean");
				self.clean(self);
			}
		});
	}
	Bone.prototype.members = [];
	Bone.prototype.img = options.img;
	Bone.prototype.cxt = options.cxt;
	Bone.prototype.frames = {
		up:[[0,192,64,256],[64,192,128,256],[128,192,192,256],[192,192,256,256]],
		down:[[0,0,64,64],[64,0,128,64],[128,0,192,64],[192,0,256,64]],
		left:[[0,64,64,128],[64,64,128,128],[128,64,192,128],[192,64,256,128]],
		right:[[0,128,64,192],[64,128,128,192],[128,128,192,192],[192,128,256,192]],
		up_left:[[0,384,64,448],[64,384,128,448],[128,384,192,448],[192,384,256,448]],
		up_right:[[0,448,64,512],[64,448,128,512],[128,448,192,512],[192,448,256,512]],
		down_left:[[0,256,64,320],[64,256,128,320],[128,256,192,320],[192,256,256,320]],
		down_right:[[0,320,64,384],[64,320,128,384],[128,320,192,384],[192,320,256,384]]
	};
}
Bone.prototype.addListener = function(obj){
	var self = this;
	obj.addEventListener("click",function(e){
		if(self.time){
			 clearInterval(self.time);
			 self.time = null;
		}
		var d = Math.abs(e.layerX-(self.x+self.width/2))+Math.abs(e.layerY-(self.y+self.height));
		if(d>30){
			pomelo.request("game.gameHandler.move",{account:self.account,x:e.layerX-self.width/4,y:e.layerY-self.height/2});
		}
	});
} 

Bone.prototype.go = function(obj,direct_x,direct_y){
	var distance_x = direct_x - obj.x;
	var distance_y = direct_y - obj.y;
	var distance = Math.sqrt(distance_x*distance_x+distance_y*distance_y);
	var num = parseInt(distance/5);
	var map = null;
	var interval_x = 5*distance_x/distance;
	var interval_y = 5*distance_y/distance;
	if(distance_x>10){
		if(distance_y>10){
			map = "down_right";
		}
		else if(distance_y<10&&distance_y>-10){
			map = "right";
		}
		else{
			map = "up_right";
		}
	}
	else if(distance_x<10&&distance_x>-10){
		if(distance_y>10){
			map = "down";
		}
		else{
			map = "up";
		}
	}
	else{
		if(distance_y>10){
			map = "down_left";
		}
		else if(distance_y<10&&distance_y>-10){
			map = "left";
		}
		else{
			map = "up_left";
		}
	}
	if(map){
		var count = 0;
		if(obj.time)
		clearInterval(obj.time);
		obj.time = setInterval(function(){
			obj.clean(obj);
			obj.cxt.drawImage(obj.img,obj.frames[map][count][0],obj.frames[map][count][1],64,64,obj.x,obj.y,obj.width,obj.height);
			obj.x+=interval_x;
			obj.y+=interval_y;
			if(num == 0){
				clearInterval(obj.time);
				obj.time = null;
				interval_x = null;
				interval_y = null;
				count = null;
			}
			num--;
			count++;
			count = count % 4;
		},200);
	}
}
Bone.prototype.add = function(obj){
	obj.members.push(obj);
}
Bone.prototype.clean = function(obj){
	obj.cxt.clearRect(obj.x+10,obj.y+3,obj.width-22,obj.height-8);
}