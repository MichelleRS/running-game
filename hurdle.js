/* imports */
import { setCustomProperty } from "./updateCustomProperty.js";

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
export function setupHurdle() {
  // set nextHurdleTime for game start
  nextHurdleTime = HURDLE_INTERVAL_MIN;
}

export function updateHurdle(delta, speedScale) {
  // TODO remove hurdles that are off screen

  // if our nextHurdleTime is less than or equal to 0
  if (nextHurdleTime <= 0) {
    // create a hurdle
    createHurdle();
    // set nextHurdleTime to a random value
    nextHurdleTime =
      randomNumberBetween(HURDLE_INTERVAL_MIN, HURDLE_INTERVAL_MAX) /
      speedScale;
    console.log("nextHurdleTime", nextHurdleTime);
  }
  // take nextHurdleTime and subtract the delta from it (makes the value smaller and smaller)
  nextHurdleTime -= delta;
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
  console.log("hurdle", hurdle);
}

// TODO function to return random number between min (200) and max (500) values
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
