/* imports */
import { setCustomProperty } from "./updateCustomProperty.js";

/* local constants */
// get world element
const worldEl = document.querySelector("[data-world]");
// initialize variable for hurdle time
let nextHurdleTime = 500;

/* export functions */
export function setupHurdle() {
  // TODO
}

export function updateHurdle(delta, speedScale) {
  // if our nextHurdleTime is less than or equal to 0
  if (nextHurdleTime <= 0) {
    // create a hurdle
    createHurdle();
    // set nextHurdleTime to a random number between a min and max interval value
    // TODO: replace 1000 with a random number between 500-2000
    nextHurdleTime = 1000 / speedScale;
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

// TODO function to get random number between min (200) and max (500) interval values
