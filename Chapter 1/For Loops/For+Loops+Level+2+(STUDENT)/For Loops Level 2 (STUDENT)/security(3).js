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
 * Security settings
 * 
 * These values are set to break out of instructions 
 * that would result in infinite loops.
 */


/**
 * This is the maximum number of times the goalReached()
 * function can be called per maze program.
 *
 * This value is used as a safety to help 
 * protect against infinite loops.
 */
var maxChecks = 100;
		
/**
 * This is the number of times goalReached() has been 
 * called upon page load.
 *
 * This is initialized to 0 upon page load, and will 
 * be incremented until it reaches maxChecks.
 */
var numberOfChecks = 0;
		
/**
 * This is the maximum number of instructions that can 
 * be appended to the animationSequence array.
 *
 * This is another safety to help protect against 
 * infinite loops.
 */
var maxLength = 100;