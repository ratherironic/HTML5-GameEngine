/*
---------------------------------
TODO:
	Implement a gravity state which is global
	Implement background sprite/scrolling
	Create Enemy Object
	Implement Enemy Collision detection
	Create platform Objects
	Reformat JS to be more standards compliant
---------------------------------
*/
var canvas = document.getElementById('GameField'),
		ctx,
		manager;

// setup namespace
var GM = (function(){
	var game = {
		onload: function(){
			if (canvas.getContext){  
				ctx = canvas.getContext('2d');
				//Create Manager Obj
				manager = new GM.manager();
				manager.pageLoad();
			}
		},
		start: function(){
			manager.play();
		},
		end: function(){
			manager.end();
		}
	}	
	return game;
})();

