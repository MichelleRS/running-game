/* imports */
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

/* local constants */
// get world element
const worldEl = document.querySelector("[data-world]");
// set hurdle speed to same speed as ground
const SPEED = 0.05;
// set a min and max hurdle interval value to be used in randomNumberBetween()
// 500 = 1/2 second
const HURDLE_INTERVAL_MIN = 500;
// 2000 = 2 seconds
const HURDLE_INTERVAL_MAX = 2000;

/* state */
// declare variable for hurdle time
let nextHurdleTime;

/* export functions */
// set up hurdle sprite for game start
export function setupHurdle() {
  // set nextHurdleTime
  nextHurdleTime = HURDLE_INTERVAL_MIN;
  // remove hurdles from DOM
  document.querySelectorAll("[data-hurdle]").forEach((hurdle) => {
    hurdle.remove();
  });
}

export function updateHurdle(delta, speedScale) {
  // render hurdle
  document.querySelectorAll("[data-hurdle]").forEach((hurdle) => {
    incrementCustomProperty(hurdle, "--left", delta * speedScale * SPEED * -1);
    // remove hurdles that are off screen
    if (getCustomProperty(hurdle, "--left") <= -100) {
      hurdle.remove();
    }
  });

  // if our nextHurdleTime is less than or equal to 0
  if (nextHurdleTime <= 0) {
    // create a hurdle
    createHurdle();
    // set nextHurdleTime to a random value
    nextHurdleTime =
      randomNumberBetween(HURDLE_INTERVAL_MIN, HURDLE_INTERVAL_MAX) /
      speedScale;
  }
  // take nextHurdleTime and subtract the delta from it (makes the value smaller and smaller)
  nextHurdleTime -= delta;
}

// get dimension values of hurdle element to use for collision detection
export function getHurdleRects() {
  // use .map() to convert hurdle into a different value
  return [...document.querySelectorAll("[data-hurdle]")].map((hurdle) => {
    // return hurdle element dimension values
    return hurdle.getBoundingClientRect();
  });
}

/* local functions */
// function to create a hurdle element to call in setupHurdle()
function createHurdle() {
  const hurdle = document.createElement("img");
  hurdle.dataset.hurdle = true;
  hurdle.src = "./assets/hurdle.png";
  hurdle.classList.add("hurdle");
  setCustomProperty(hurdle, "--left", 100);
  worldEl.append(hurdle);
}

// function to return random interval value
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
