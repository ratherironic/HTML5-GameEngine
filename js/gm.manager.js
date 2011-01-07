var GM = GM || {};

var player,
		missile,
		enemy,
		gravity = 10,
		velocity = 5,
		FPS = 30,
		maxNumEnemies = 5,
		maxNumMissiles=3,
		gameWidth = $('#GameField').width(),
		gameHeight = $('#GameField').height(),
		missiles = [],
		enemies = [],
		pi = Math.PI;

GM.manager = function(){
			
	var pub = {
		pageLoad: function(){
			//Call PageLoad Functions of the Objects
			pub.gametimer();
			pub.getInput();
			player = new GM.player();
			
			for(var i=0; i<maxNumEnemies; i++){
				enemy = new GM.enemy();
				enemies.push(enemy);
				enemies[i].setPos(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight));
			}	
		},
		getInput: function(){
			$(document).keypress(function(event) {
				if (event.keyCode == '37') {
					player.moveLeft();
				}else if(event.keyCode == '39'){
					player.moveRight();
				}else if(event.keyCode == '0'){
					if(missiles.length < maxNumMissiles){
							missile = new GM.missile();
							missile.launch(player.getX(), player.getY(), player.getRotation());
							missiles.push(missile);
					}
				}
			});
			$('#GameField').click(function(e){
				player.headFor(e.pageX, e.pageY);
			});
		},
		
		gametimer: function(){
			setInterval(pub.draw, 1000 / FPS);
		},
		collision:function(object, object2){
			boxU = object.getHiWi();
			boxE = object2.getHiWi();
			playerLeft = object.getX();
			enemyLeft = object2.getX();
		  playerRight = playerLeft + boxU.w;
		  enemyRight = enemyLeft + boxE.w;
		  playerTop = object.getY();
		  enemyTop = object2.getY();
			
		  playerBottom = playerTop + boxU.h;
		  enemyBottom = enemyTop + boxE.h;

		  if (playerBottom < enemyTop) return false;
		  if (playerTop > enemyBottom) return false;
		  if (playerRight < enemyLeft) return false;
		  if (playerLeft > enemyRight) return false;

		  return true;
		},
		draw: function(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			player.fwd();
			if(enemies.length){
				for(var i = 0; i<enemies.length; i++){
					enemies[i].fwd();
					enemies[i].headFor(player.getX(), player.getY());
					if(pub.collision(player, enemies[i])){
						//player has been hit. do something. 
					}
				}
			}
			if(missiles.length){
				for(var i = 0; i<missiles.length; i++){
					var myPos = missiles[i].getPos();
					var myWH = missiles[i].getHiWi();
						if(myPos.y < 0 || myPos.y + myWH.h > gameHeight){
							missiles.splice(i,1);
						}else if(myPos.x<0 || myPos.x+myWH.w > gameWidth){
							missiles.splice(i,1);
						}else{
							missiles[i].move();
							if(enemies.length){
								for(var j = 0; j<enemies.length; j++){
									if(pub.collision(missiles[i], enemies[j])){
										enemies.splice(j,1);
									}
								}
							}
						}
				}
			}
		}
	};
	return pub;
};