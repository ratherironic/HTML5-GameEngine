var GM = GM || {};

GM.missile = function(){
	var mis_speed = 15,
			mis_x = 0,
			mis_y = 0,
			mis_rotation = 0,
			mis_width = 10,
			mis_height = 10,
			mis_color = 'red',
			mis_ang = 5,
			pi = Math.PI;
	
	var pub = {
		launch:function(startX, startY, ang){
			mis_x = startX;
			mis_y = startY;
			mis_rotation = ang;
		},
		move:function(){	
			var changePos = {
				x: Math.round(mis_speed * Math.cos(mis_rotation * pi/180)),
				y: Math.round(mis_speed * Math.sin(mis_rotation * pi/180))
			}
			mis_x = mis_x + changePos.x;
			mis_y = mis_y + changePos.y;
			ctx.fillStyle = "rgb(248, 202, 0)";
			ctx.fillRect(mis_x, mis_y, mis_width, mis_height);
		},
		getX:function(){
			return mis_x;
		},
		getY:function(){
			return mis_y;
		},
		getPos:function(){
			return {x:mis_x, y:mis_y}; 
		},
		getHiWi:function(){
			return {w:mis_width, h:mis_height}; 
		},
	};
	return pub;
};

		
