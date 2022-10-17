/**
	Easter Eggs for Maze Simulator (c) by Sujay Nanjannavar
	Maze Simulator is licensed under a
	Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
	You should have received a copy of the license along with this work. 
	If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.
	
	Last Edited: September 12, 2019

	PLEASE READ:
	Call any of these functions inside of robotInstructions() just as you would for moveForward(), rotateRight(), rotateLeft(), etc
	Read all the comments to use the functions properly 
**/

/**
	Call this function with a string parameter of your desired color
	List of Colors: https://www.w3schools.com/colors/colors_names.asp
	Example: chooseColor("Aquamarine");
**/
function chooseColor(newColor) {
	animationTriangle.color = newColor;
}

/**
	Call rainbowColors(true) to have your triangle index through an array of colors
	This function passes in a boolean value to toggle on and off a rainbow effect
**/
toggle = false;
function rainbowColors(toggle) {
	
	if(toggle && paused) {
	var colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];
	var currentIndex = 0;
	canvas.addEventListener('mousedown', function(evt) {
		mouseDown = true;
		var mousePos = getMousePos(canvas, evt);
		var currentX = mousePos.x;
		var currentY = mousePos.y;
		if (currentX >= 1 && currentX <= Math.floor(cWidth/3)-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
			setInterval(function() {
				animationTriangle.color = colors[currentIndex];
				if (!colors[currentIndex]) {
				   currentIndex = 0;
				} else {
				   currentIndex++;
				}
				},100);
			}
		if (currentX >= 2*Math.floor(cWidth/3)+1 && currentX <= cWidth-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
			toggle = false;
		}
	}, false);
	}
}

/**
	Call funMusic() and pass a string parameter of a link to your desired song. Whenever the play button is pressed, the song will start playing.
	List of Music: https://www.youtube.com/audiolibrary/music
	To retrieve the link to the song, just right click the download button and left click the "Copy link address" button.
**/
function funMusic(musicURL) {
	var audio = new Audio(musicURL);
	canvas.addEventListener('mousedown', function(evt) {
			mouseDown = true;
			var mousePos = getMousePos(canvas, evt);
			var currentX = mousePos.x;
			var currentY = mousePos.y;
	if (currentX >= 1 && currentX <= Math.floor(cWidth/3)-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
	audio.play()
	}
	if(currentX >= Math.floor(cWidth/3)+1 && currentX <= 2*Math.floor(cWidth/3)-1 && currentY >= rectCount*rectWidth+2 && currentY <= cHeight-2){
	audio.pause();
	}
	}, false);
}