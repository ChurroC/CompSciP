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
 * Robot movement functions
 *
 * These functions control how the robot moves.
 */

/**
 * Rotate the robot to the right, then add the 
 * instruction to the animationSequence array
 */
function rotateRight(){
	testRotation += 90;
	if (animationSequence.length < maxLength){
		animationSequence.push(["rotate",90]);
	}
}
		
/**
 * Rotate the robot to the left, then add the 
 * instruction to the animationSequence array
 */
function rotateLeft(){
	testRotation -= 90;
	if (animationSequence.length < maxLength){
		animationSequence.push(["rotate",-90]);
	}
}

/**
 * Test if the robot has reached the end of the maze.
 * Return true if the robot has reached the end of the maze.
 * Return false if the robot has not yet finished the maze.
 * Note: For stability purposes, only allow this function
 *		 to be called maxChecks times.
 */
function goalReached(){
	numberOfChecks++
	if (status == "playing" && numberOfChecks < maxChecks){
		return false
	}
	else {
		return true
	}
}
		
/**
 * Move the robot forward relative to its current orientation.
 * If this is a valid move, add the instruction 
 * 		to the animationSequence array.
 * If this is an invalid move, change the game 
 * 		status to "game over".
 * If this is a winning move, change the game 
 * 		status to "you win"
 */
function moveForward(){
	if (((testRotation % 360) + 360) % 360 == 0){
		testTriangle.y -= rectWidth;
	}
	else if (((testRotation % 360) + 360) % 360 == 180){
		testTriangle.y += rectWidth;
	}
	else if (((testRotation % 360) + 360) % 360 == 90){
		testTriangle.x += rectWidth;
	}
	else if (((testRotation % 360) + 360) % 360 == 270){
		testTriangle.x -= rectWidth;
	}
	
	var intersectionTest = checkIntersections();
			
	if (intersectionTest == "#000000"){
		status = "game over";		
	}
	else if (intersectionTest == "#888888")
	{
		status = "you win"
	}
	else
	{
		status = "playing"
	}
	if (animationSequence.length < maxLength && status == "playing"){
		animationSequence.push(["move",rectWidth]);
	}
	else if (animationSequence.length < maxLength && status == "you win"){
		animationSequence.push(["move",rectWidth]);
		animationSequence.push(["you win",0]);
	}
	else if (status == "game over"){
		animationSequence.push(["game over",0]);
	}		
}
		
/**
 * This is a function that returns true or false regarding
 * whether the robot can move forward, backward, left, or
 * right // relative to its current orientation. 
 * parameters: "forward", "backward", "left", or "right"
 */
function canMove(direction){
	var tempRotation = testRotation;
	if (direction == "left"){
		tempRotation -= 90;
	}
	else if (direction == "right"){
		tempRotation += 90;
	}
	else if (direction == "backward"){
		tempRotation += 180;
	}
	if (((tempRotation % 360) + 360) % 360 == 0){
		// test the condition "can move up?"
		testTriangle.y -= rectWidth;
		if (checkIntersections()=="#000000"){
			moveTest = false;
		}
		else {
			moveTest = true;
		}
		testTriangle.y += rectWidth;
	}
	else if (((tempRotation % 360) + 360) % 360 == 180){
		// test the condition "can move down?"
		testTriangle.y += rectWidth;
		if (checkIntersections()=="#000000"){
			moveTest = false;
		}
		else {
			moveTest = true;
		}
		testTriangle.y -= rectWidth;
	}
	else if (((tempRotation % 360) + 360) % 360 == 270){
		// test the condition "can move left?"
		testTriangle.x -= rectWidth;
		if (checkIntersections()=="#000000"){
			moveTest = false;
		}
		else {
			moveTest = true;
		}
		testTriangle.x += rectWidth;
	}
	else if (((tempRotation % 360) + 360) % 360 == 90){
		// test the condition "can move right?"
		testTriangle.x += rectWidth;
		if (checkIntersections()=="#000000"){
			moveTest = false;
		}
		else {
			moveTest = true;
		}
		testTriangle.x -= rectWidth;
	}
	return moveTest;
}
