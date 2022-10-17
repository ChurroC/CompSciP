/**
 *
 * Maze Simulator (c) by Christopher Grattoni
 * Maze Simulator is licensed under a
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You should have received a copy of the license along with this work. 
 * If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.
 *
 * Last Edited: Aug 9, 2017
 *
 */

/**
 * Game engine
 *
 * This is the core of the game.
 */

/**
 * The current game status.
 * If the robot hits a white square, status = "playing"
 * If the robot hits a black square, status = "game over"
 * If the robot hits a gray square, status = "you win"
 */
var status = "playing"

/** Boolean tracking the state of the pause button. */
var paused = true;

/** This is the canvas context, it is used to call canvas methods. */
var c;

/** Our canvas object. */
var canvas;
		
/** Our canvas width and height.*/
var cWidth, cHeight;
		
/** This array will hold all the background maze rectangles */
var background = [];
		
/** These are the buttons on the screen. */
var startButton;
var pauseButton;
var resetButton;

/** 
 * Detect whether mouse is down, and whether the player has
 * clicked a control button (play, pause, or reset).
 */
var greenClick = false;
var yellowClick = true;
var redClick = false;
var mouseDown = false;
		
/**
 * testTriangle is the "trial run" of the course that we run through
 * upon the the game loading
 */
var testTriangle;
		
/** This is the initial rotation of the "trial run" robot, usually set to 0. */
var testRotation = initialRotation;
				
/** 
 * This triangle is the moving robot we will actually animate
 * using the steps recorded by the testTriangle upon loading.
 */
var animationTriangle;
var animationRotation = initialRotation;

/**
 *	This triangle is the red triangle that the player will place
 *	when playing in 'prediction' mode.
 */
var predictionTriangle;
var predictionRotation;
		
/** This array will hold all robot movement instructions for the animation. */
var animationSequence = [];
		
/** This is the starting position of the robot. */
var startX;
var startY;
var startWidth;
var startHeight;
		
/** This is a class of background rectangles in the maze. */
class backgroundClass{
	constructor(rectX, rectY, rectWidth, rectHeight, rectColor){
		this.x = rectX;
		this.y = rectY;

		this.width = rectWidth;
		this.height = rectHeight;

		this.color = rectColor;
	}
	draw(){
		c.fillStyle = this.color;
		c.fillRect(this.x,
				   this.y,
				   this.width,
				   this.height);
	}

}
		
/** This is a triangle class for the robot.	*/
class triangleClass{
	constructor(triangleX, triangleY, triangleWidth, triangleHeight, triangleColor){
		this.x = triangleX;
		this.y = triangleY;

		this.width = triangleWidth;
		this.height = triangleHeight;

		this.color = triangleColor;
	}
			
	intersects(obj){
		if (this.x < obj.x + obj.width &&
			this.x + this.width > obj.x &&
			this.y < obj.y + obj.height &&
			this.y + this.height > obj.y)
		{
			return true;
		}
		else{
			return false;
		}
	}
			
	draw(degrees){
		c.save();
		c.beginPath();
		c.translate(this.x + this.width/2, this.y-this.height/2 );
		c.rotate(degrees*Math.PI/180);
		c.moveTo(-this.width/2, this.height/2);
		c.lineTo(0, -this.height/2);
		c.lineTo(this.width/2, this.height/2);
		c.closePath();
		c.lineWidth = 2;
		c.strokeStyle = '#000000';
		c.stroke();
		c.fillStyle = this.color;
		c.fill();	
		c.restore();
	}
}
		
/** 
 * Instantiate a prediction triangle off screen just
 * in case the user forgets to or they are in 'maze' mode
 *
 */
predictionTriangle = new triangleClass(-10, -10, 10, 10, '#000000'); 
	
/** Background rectangle dimensions */
var rectLength;
var rectWidth;

		
/**
 * Animate the path the robot takes by processing the values 
 * in the animationSequence array.
 */
function animatePath(){
	
	if (animationSequence.length == 0 && status == "playing" && mode == 'prediction'){
		if (predictionTriangle.x == testTriangle.x && predictionTriangle.y == testTriangle.y && predictionRotation == ((testRotation % 360) + 360) % 360) {
			animationSequence = [["you win",0]];	
			status = "you win";
			return
		}
		else {
			animationSequence = [["game over",0]];	
			status = "game over";
			return						
		}
	}
	
	if (animationSequence.length > 0 && paused == false){
		var firstElement = animationSequence[0];
		if (firstElement[0]=="you win" || firstElement[0]=="game over"){
			return
		}
		if (firstElement[1]==0){
			if (timeout > 0){
				timeout--;
			}
			else {
				animationSequence.shift();
				timeout = timeoutDefault;
			}
		}
		else {
			if (firstElement[0]=="rotate"){
				if (firstElement[1]>0){
					animationRotation += rotJump;
					animationSequence[0][1] -= rotJump;							
				}
				else {
					animationRotation -= rotJump;
					animationSequence[0][1] += rotJump;
				}
			}
			else {
				if (((animationRotation % 360) + 360) % 360 == 0) {
					animationTriangle.y -= translationJump;
					animationSequence[0][1] -= translationJump;					
				}
				else if (((animationRotation % 360) + 360) % 360 == 90) {
					animationTriangle.x += translationJump;
					animationSequence[0][1] -= translationJump;				
				}
				else if (((animationRotation % 360) + 360) % 360 == 270) {
					animationTriangle.x -= translationJump;
					animationSequence[0][1] -= translationJump;					
				}
				else if (((animationRotation % 360) + 360) % 360 == 180) {
					animationTriangle.y += translationJump;
					animationSequence[0][1] -= translationJump;					
				}
			}
		}
	}
}

/**
 * Draw a message on screen if the game state 
 * is in "you win" or "game over".
 */
function drawMessage(){
	if (animationSequence.length > 0){
		currentInstruction = animationSequence[0][0];
		if (currentInstruction == "game over"){
					
			c.fillStyle = "#FF0000";
			c.font = "bold 80px Arial";
			c.textAlign="center";

			c.strokeStyle = "#000000";
			c.lineWidth=8;
			c.strokeText("You Lose", cWidth/2, cWidth/2);

			c.fillText("You Lose", cWidth/2, cWidth/2);	
					
			c.strokeStyle = "#FF9999";
			c.lineWidth=3;
			c.strokeText("You Lose", cWidth/2, cWidth/2);	
					
			c.textAlign="start";
		}
		else if (currentInstruction=="you win"){

			c.fillStyle = "#00BB00";
			c.font = "bold 80px Arial";
			c.textAlign="center";
			
			c.strokeStyle = "#000000";
			c.lineWidth=8;
			c.strokeText("You Win", cWidth/2, cWidth/2);
			
			c.fillText("You Win", cWidth/2, cWidth/2);	
					
			c.strokeStyle = "#99DD99";
			c.lineWidth=4;
			c.strokeText("You Win", cWidth/2, cWidth/2);
	
			c.textAlign="start";
		}
	}
	else if (paused == false && mode == 'maze') {
			c.fillStyle = "#FF0000";
			c.font = "bold 80px Arial";
			c.textAlign="center";
			c.fillText("You Lose", cWidth/2, cWidth/2);	
					
			c.strokeStyle = "#FF9999";
			c.lineWidth=3;
			c.strokeText("You Lose", cWidth/2, cWidth/2);	
					
			c.textAlign="start";
	}
}
		
/**
 * Get mouse position so we know where the cursor is.
 * This function returns an object, so if var obj1 = getMousePos(canvas, evt)
 * then obj1.x and obj1.y are the return values.
 */
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	}
}
		
/** 
 * Check for intersections between the robot and the background rectangles.
 * When an intersection is found, return the color of the rectangle.
 * This color will be used to determine the game state:
 * 		white: game is in progress
 *		black: the game has been lost
 * 		gray: the game has been won
 * Note: if the robot goes out of the playable area, return black, "#000000"
 */
function checkIntersections(){
	if (testTriangle.y < 0 || testTriangle.x < 0 || testTriangle.y > rectWidth*rectCount || testTriangle.x > rectWidth*rectCount ){
		return "#000000"
	}
		
	for (i=0; i<rectCount; i++){
		for (j=0; j<rectCount; j++){
			var currentRectangle = background[i][j];
			var intersectionStatus = testTriangle.intersects(currentRectangle);
					
			if (intersectionStatus){
				return currentRectangle.color
			}
		}
	}
}
		
/** 
 * This function draws the background maze using 
 * the user-defined values in rectGrid
 * it also draws the control buttons on the bottom of the screen
 */
function gameSetup(){
	for (i=0; i<rectCount; i++){
				
		// For each row of rectangles, add an empty row to the array of background rectangles
		background.push([]);
				
		for (j=0; j<rectCount; j++){
			var xCoord = rectWidth*j+1;
			var yCoord = rectLength*i+1;
			var width = rectWidth-2;
			var height = rectLength-2;
			
			var xCoordTriangle = rectWidth*j + rectWidth/3;
			var yCoordTriangle = rectWidth*(i+1) - rectWidth/9;
			var widthTriangle = 2*cWidth/(5*rectCount);
			var heightTriangle = cWidth/rectCount-cWidth/(4*rectCount);
			
			var black = "#000000";
			var white = "#FFFFFF";
			var gray = "#888888";
						
			var rectStatus = rectGrid[i][j];
			
			if (rectStatus == 0) {
				temp = new backgroundClass(xCoord, yCoord, width, height, black);	
				temp.draw();
			}
			else if (rectStatus==1) {
				temp = new backgroundClass(xCoord, yCoord, width, height, white);
				temp.draw();
			}
			else if (rectStatus==2){
				temp = new backgroundClass(xCoord, yCoord, width, height, gray);
				temp.draw();
			} 
			else {
				temp = new backgroundClass(xCoord, yCoord, width, height, white);
				temp.draw();
				
				predictionTriangle = new triangleClass(xCoordTriangle, yCoordTriangle, widthTriangle, heightTriangle, gray);
				if (rectStatus=='u') {
					predictionRotation = 0;
					predictionTriangle.draw(predictionRotation);					
				}
				else if (rectStatus=='r') {
					predictionRotation = 90;
					predictionTriangle.draw(predictionRotation);			
				}				
				else if (rectStatus=='d') {
					predictionRotation = 180;
					predictionTriangle.draw(predictionRotation);				
				}
				else if (rectStatus=='l') {
					predictionRotation = 270;
					predictionTriangle.draw(predictionRotation);				
				}	
			} 
				
			// add the rectangle to the i-th row of the background array
			background[i].push(temp);
		}
	}
			
	if (greenClick==false){
		c.fillStyle = "#55BB55";
	}
	else {
		c.fillStyle = "#55FF55";
	}
	c.fillRect(1, rectCount*rectWidth+2, Math.floor(cWidth/3)-2, 99);
		
	c.fillStyle = "#000000";
	c.font = "24px Arial";
	c.fillText("Play", 1+cWidth/10, cWidth+cWidth/7.5);
			
	if (yellowClick==false){
		c.fillStyle = "#BBBB22";
	}
	else {
		c.fillStyle = "#FFFF22";
	}
	c.fillRect(Math.floor(cWidth/3)+1, rectCount*rectWidth+2, Math.floor(cWidth/3)-2, 99);
			
	c.fillStyle = "#000000";
	c.font = "24px Arial";
	c.fillText("Pause", 1+4.1*cWidth/10, cWidth+cWidth/7.5);
		
	if (redClick == false || mouseDown == false){
		c.fillStyle = "#BB2222";
	}
	else {
		c.fillStyle = "#FF2222";
	}
			
	c.fillRect(2*Math.floor(cWidth/3)+1, rectCount*rectWidth+2, Math.floor(cWidth/3)-2, 99);
			
	c.fillStyle = "#000000";
	c.font = "24px Arial";
	c.fillText("Reset", 1+7.5*cWidth/10, cWidth+cWidth/7.5);
}
		
/** 
 * This function initializes the entire game framework.
 * This method should only be called once, by the body onload event handler.
 */
function gameFrameworkInit(){
	// Initialize global variables for canvas
	canvas = document.getElementById('myCanvas');
	c = myCanvas.getContext('2d');
	cWidth = myCanvas.width;
	cHeight = myCanvas.height;
		
	rectLength = Math.floor((cHeight-100)/rectCount);
	rectWidth = Math.floor(cWidth/rectCount);
						
	startX = xSquare*rectWidth+rectWidth/3
	startY = ySquare*rectWidth-rectWidth/9
	startWidth = 2*cWidth/(5*rectCount);
	startHeight = cWidth/rectCount-cWidth/(4*rectCount);

	
	animationTriangle = new triangleClass(startX, startY, startWidth, startHeight,"#22BBFF");
	testTriangle = new triangleClass(startX, startY, startWidth, startHeight,"#22BBFF");
			
	// Listen for mouseclicks on the buttons.		
	canvas.addEventListener('mousedown', function(evt) {
			mouseDown = true;
			var mousePos = getMousePos(canvas, evt);
			var currentX = mousePos.x;
			var currentY = mousePos.y;
			
			// If user clicks the green "Play" button.
			if (currentX >= 1 && currentX <= Math.floor(cWidth/3)-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
				greenClick = true;
				yellowClick = false;
				paused = false;
			}
			// If the user clicks the yellow "Pause" button.
			if (currentX >= Math.floor(cWidth/3)+1 && currentX <= 2*Math.floor(cWidth/3)-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
				yellowClick = true;
				greenClick = false;
				paused = true;
			}
			// If the user clicks the red "Reset" button.
			if (currentX >= 2*Math.floor(cWidth/3)+1 && currentX <= cWidth-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
				yellowClick = false;
				greenClick = false;
				redClick = true;
				paused = true;
			}
		}, false);
	
	// Upon letting up the mouse button, reset the game if the red button
	// was the one that was clicked.
	canvas.addEventListener('mouseup', function(evt) {
		mouseDown = false;
		if (redClick == true){
			yellowClick = true;
			greenClick = false;
			paused = true;
			numberOfChecks = 0;
			animationRotation = initialRotation;
			animationTriangle.x = startX;
			animationTriangle.y = startY;
			testRotation = initialRotation;
			testTriangle.x = startX;
			testTriangle.y = startY;
			animationSequence = [];
			status = "playing";	
			gameSetup();
			animationTriangle.draw(animationRotation);
			robotInstructions();
		}
		redClick = false; 				
		}, false);
			
	gameSetup();
	robotInstructions();
		
	// Schedule the update function to be called right before the next repaint.
	// (At the end of the update function, it will schedule itself to be called
	// again before the NEXT repaint, and so on.
	window.requestAnimationFrame(gameUpdate);
}


function gameUpdate(){
	// At the end of the update function, repaint the screen.
	
	animatePath();
	gameDraw();

	// Last thing the update function does is to schedule itself to be called
	// again before the next repaint.
	window.requestAnimationFrame(gameUpdate);
}
				

function gameDraw(){
	
	// Clear the canvas before we draw the current frame.
	c.clearRect(0,0,cWidth,cHeight);
	
	// Draw background maze.
	gameSetup();
	
	// Draw the maze triangle.
	animationTriangle.draw(animationRotation);
	
	// Draw any messages such as "You Win" or "You Lose"
	drawMessage();
}
