/* imports */
import { setupGround, updateGround } from "./ground.js";

/* initialize constants */
// world width and height ratio for use in setPixelToWorldScale()
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

/* get DOM elements */
// get world element
const worldEl = document.querySelector("[data-world");
// get start screen text
const startScreenEl = document.querySelector("[data-start-screen]");
console.log("startScreenEl", startScreenEl);

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
  updateGround(delta);
  // set lastTime to time
  lastTime = time;
  // call update function
  window.requestAnimationFrame(update);
}

function handleStartGame() {
  console.log("I pressed any key to start the game!");
  // set lastTime to null for game restart
  lastTime = null;
  // function call to set up ground elements
  setupGround();
  //remove start screen text
  startScreenEl.classList.add("hide");
  // update frame
  window.requestAnimationFrame(update);
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
