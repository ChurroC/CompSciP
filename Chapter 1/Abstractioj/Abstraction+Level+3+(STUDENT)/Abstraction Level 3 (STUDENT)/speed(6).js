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
 * Robot speed settings
 *
 * These values determine how fast the robot moves.
 */

/**
 * This is the number of updates to wait between robot moves.
 * Note: for a faster animation, set timeout closer to 0
 * Note: for a really slow animation, set timeout to a number >= 25
 */ 
var timeout = 10;
var timeoutDefault = timeout;
		
/**
 * This is how many degrees the robot should 
 * rotate during each update step.
 * You should pick a number that evenly divides 90.
 * Note: numbers between 1 and 10 seem to work best.
 */
var rotJump = 15;
		
/**
 * This is how far the robot should jump between 
 * updates when it is moving up/down/left/right.
 * 
 * Numbers larger than 3 seem to cause bugs.
 */
var translationJump = 1;
