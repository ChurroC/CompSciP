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
 * Maze settings
 *
 * These values are the initial settings for the maze. 
 * These can be adjusted to create a new maze.
 */

/** 
 * The number of rectangles, n, along the base 
 * of the n x n grid. 
 */
var rectCount = 11;

/**
 * The game can either be in 'maze' mode or 'prediction' mode.
 * 		'maze' mode: Try to write instructions to get the robot to the gray square.
 *
 *		'prediction' mode: Read the given code (robot movement instructions), then
 *							determine the final position and orientation of the robot.
 */
var mode = 'maze';

/**
 * This is the user-defined initial rectangle setup.
 * This should be a rectCount x rectCount square grid.
 * 		2 is a gray square
 * 		1 is a white square
 * 		0 is a black square
 *
 *		In prediction mode: 'u' is a red robot facing up
 *							'd' is a red robot facing down
 *							'l' is a red robot facing left
 *							'r' is a red robot facing right
 *
 * Use this to draw a maze.
 */
var rectGrid = [[2,1,1,1,0,1,0,1,1,1,1],
				[0,0,0,1,0,1,0,1,0,0,0],
				[0,0,0,1,0,1,0,1,1,1,0],
				[0,0,0,1,0,1,0,1,0,1,0],
				[0,1,1,1,0,1,1,1,0,1,0],
				[0,1,0,0,0,0,0,0,0,1,1],
				[0,1,0,1,1,1,0,0,0,0,1],
				[0,1,0,1,0,1,0,0,0,0,1],
				[0,1,0,1,0,1,1,1,1,1,1],
				[0,1,0,1,0,0,0,1,0,0,1],
				[0,1,1,1,0,1,1,1,0,0,1],];
		
/**
 * This is the starting square for the robot in the maze:
 *
 * Note: x squares are counted started from the 
 * 		left at square 0
 * 
 * Note: y squares are counted from the top 
 * 		of the screen starting at 1
 */
var xSquare = 10;
var ySquare = 11;

/**
 * This is the starting rotation for the robot.
 * For a robot facing upwards, leave this as 
 * initialRotation = 0.
 * Other values to try are 90, -90, and 180.
 */
var initialRotation = 0;
