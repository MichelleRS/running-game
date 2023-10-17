/* imports */
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

// set state for speed
const SPEED = 0.05;
// get ground elements
const groundEls = document.querySelectorAll("[data-ground]");

/* functions */
// function to set up ground elements
export function setupGround() {
  // set --left property of first .ground element to 0
  setCustomProperty(groundEls[0], "--left", 0);
  // set --left property of second .ground element to 300
  setCustomProperty(groundEls[1], "--left", 300);
}

// function to update ground
export function updateGround(delta, speedScale) {
  // update position of ground elements
  groundEls.forEach((ground) => {
    // increment ground element for the --left property in css
    // note: negative value moves it backwards
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);
    // if the --left property of .ground is less than or equal to -300 (the ground moved off the edge of the screen)
    // note: solution for ground running out
    if (getCustomProperty(ground, "--left") <= -300)
      // loop this ground all the way around and put it on the end of the second ground element
      incrementCustomProperty(ground, "--left", 600);
  });
}
