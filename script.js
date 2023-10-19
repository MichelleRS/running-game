/* imports */
import { setupGround, updateGround } from "./ground.js";
import { getHurdleRects, setupHurdle, updateHurdle } from "./hurdle.js";
import {
  getPlayerRect,
  setPlayerLose,
  setupPlayer,
  updatePlayer,
} from "./player.js";

/* initialize constants */
// world width and height ratio for use in setPixelToWorldScale()
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
// speed scale for increasing speed as game updates
const SPEED_SCALE_INCREASE = 0.00001;

/* get DOM elements */
// get world element
const worldEl = document.querySelector("[data-world");
// get start screen text
const startScreenEl = document.querySelector("[data-start-screen]");
// get score element
const scoreEl = document.querySelector("[data-score]");
console.log("scoreEl", scoreEl);

/* on load and events */
// function call to scale world based on how big screen is
setPixelToWorldScale();
// if window gets resized, make function call to scale world
window.addEventListener("resize", setPixelToWorldScale);
// if any key is pressed, start game with condition of only happening once on key press
window.addEventListener("keydown", handleStartGame, { once: true });

/* state */
// declare variable to hold last time a frame runs in update()
let lastTime;
// declare variable to hold score
let score;
// declare variable to hold speed scale
let speedScale;

/* functions */
// game update function
function update(time) {
  // handle gap between game load and start time
  if (lastTime == null) {
    console.log("null!");
    // update last time to be current time
    lastTime = time;
    // update frame
    window.requestAnimationFrame(update);
    // return
    return;
  }
  // initialize variable to hold elapsed time between frame updates
  const delta = time - lastTime;
  // function call to update position of the ground
  updateGround(delta, speedScale);
  // function call to update player
  updatePlayer(delta, speedScale);
  // function call to update hurdle element
  updateHurdle(delta, speedScale);
  // function call to update speedScale
  updateSpeedScale(delta);
  // update score
  updateScore(delta);
  // handle game over
  if (checkGameOver()) return handleGameOver();
  // set lastTime to time
  lastTime = time;
  // call update function
  window.requestAnimationFrame(update);
}

// function to check for game over
function checkGameOver() {
  // get player dimensions
  const playerRect = getPlayerRect();
  // return true if player and hurdle collide
  return getHurdleRects().some((rect) => isCollision(rect, playerRect));
}

// function to check if player and hurdle collide
function isCollision(rect1, rect2) {
  // return true if all this is true:
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  // for every second that passes, add 10 points to score
  score += delta * 0.01;
  // update score element to display score as a whole number
  scoreEl.textContent = Math.floor(score);
}

function handleStartGame() {
  console.log("I pressed any key to start the game!");
  // set lastTime to null for game restart
  lastTime = null;
  // set speed scale
  speedScale = 1;
  // set score to 0
  score = 0;
  // function call to set up ground elements
  setupGround();
  // function call to set up player
  setupPlayer();
  // function call to set up hurdle element
  setupHurdle();
  //remove start screen text
  startScreenEl.classList.add("hide");
  // update frame
  window.requestAnimationFrame(update);
}

// function to handle game over
function handleGameOver() {
  console.log("game over!!");
  // change player image
  setPlayerLose();
  // restart game
  // note: setTimeout prevents game from auto restarting in cases where space bar is pressed on collision
  setTimeout(() => {
    document.addEventListener("keydown", handleStartGame, { once: true });
    // reveal start screen
    startScreenEl.classList.remove("hide");
  }, 100);
}
// function to scale world
function setPixelToWorldScale() {
  let worldToPixelScale;
  // if our window ratio is wider than our world ratio, scale pixels based on width
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  }
  // otherwise, scale pixels based on height
  else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  // set width and height styles
  worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
