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
	pi = Math.PI,
	gameTimer;

GM.manager = function(){
	var _self = {
		'bindKeyInput': function(){
			$(document).keypress(function(event) {
				if (event.keyCode == '37') {
					player.moveLeft();
				}else if(event.keyCode == '39'){
					player.moveRight();
				}else if(event.keyCode == '32' || event.charCode == '32'){
					if(missiles.length < maxNumMissiles){					
						missile = new GM.missile();
						missile.launch(player.getX(), player.getY(), player.getRotation());
						missiles.push(missile);
					}
				}
			});
		},
		'bindMouseInput' : function () {
			$('#GameField').bind('click', function(e){
				player.headFor(e.pageX, e.pageY);
			});
		},
		'endTheGame' : function () {
			ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
			ctx.fillText("YOU LOSE! GOOD DAY SIR!", (gameWidth / 2), (gameHeight / 2) + 25);
			pub.endTimer();
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
					if(_self.collision(player, enemies[i])){
						if( player.getHealth() > 0 ) {
							player.takeDamage();
						} else {
							//end the game
							_self.endTheGame();
						}
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
								if(_self.collision(missiles[i], enemies[j])){
									enemies.splice(j,1);
								}
							}
						}
					}
				}
			}
		}
	}		
	
	var pub = {
		'init': function(){
			//Call PageLoad Functions of the Objects
			pub.gameTimer();
			
			//Bind Inputs
			_self.bindKeyInput();
			_self.bindMouseInput();
			
			//Create Player
			player = new GM.player();
			
			//Create Enemies
			for(var i=0; i<maxNumEnemies; i++){
				enemy = new GM.enemy();
				enemies.push(enemy);
				enemies[i].setPos(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight));
			}
			
			
		},
		gameTimer: function(){
			gameTimer = setInterval( _self.draw, 1000 / FPS);
		},
		endTimer : function() {
			clearInterval(gameTimer);
		}
	};
	return pub;
};