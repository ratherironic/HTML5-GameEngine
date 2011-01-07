var GM = GM || {};

GM.enemy = function(){
	var speed = 2,
			x = 0,
			y = 0,
			rotation = 0,
			width = 20,
			height = 20,
			ang = 15,
			pi = Math.PI;
			
	var pub = {
		moveRight: function() {
			rotation += ang;
		},
		moveLeft: function() {
			rotation -= ang;
		},
		reflectLeftRight: function(){
			rotation = -1 * (rotation + 180);
		},
		reflectTopBottom: function(){
			rotation = -1 * (rotation);
		},
		headFor: function(newX, newY){
			var dY = y - newY;
			var dX = newX - x;
			rotation = 360 - Math.round(Math.atan2(dY,dX)*180/ pi);
		},
		howfar:function(){
			var goalPt,
					startPt;
			goalPt = {x: newX, y:newY};
			var vDistance = Math.round(Math.sqrt(((goalPt.x - x)^2) + ((y - goalPt.y)^2)));
			return vDistance;
		},
		
		fwd:function(){
			var changePos = {
				x: Math.round(speed * Math.cos(rotation * pi/180)),
				y: Math.round(speed * Math.sin(rotation * pi/180))
			}
			x = x + changePos.x;
			y = y + changePos.y;
			ctx.fillStyle = "rgb(175,59,59)";
			ctx.fillRect(x, y, width, height);
		},
		setPos:function(newX, newY){
			x = newX;
			y = newY;
		},
		getX:function(){
			return x;
		},
		
		getY:function(){
			return y;
		},
		getHiWi:function(){
			return {w:width, h:height}; 
		},
		getRotation:function(){
			return rotation;
		}
	};
	return pub;
};




		
