/* imports */
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

/* initialize constants for player */
// get player element
const playerEl = document.querySelector("[data-player]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const PLAYER_FRAME_COUNT = 2;
const FRAME_TIME = 100;

/* state */
// declare variable for player jump
// note: will be a boolean value
let isJumping;
// declare variable for player frame
// note: used to toggle between player-run-0.png and player-run-1.png in handleRun()
let playerFrame;
// declare variable for current frame time
let currentFrameTime;
// declare variable for y velocity
// note: used for handling jump calculations
let yVelocity;

// setup player
export function setupPlayer() {
  console.log("Set up player!");
  // set isJumping to false
  isJumping = false;
  // set player frame to 0
  playerFrame = 0;
  // set current frame time to 0
  currentFrameTime = 0;
  // set yVelocity to 0
  yVelocity = 0;
  // align player with ground
  setCustomProperty(playerEl, "--bottom", 0);
  // reset jump
  document.removeEventListener("keydown", onJump);
  // listen for jump
  document.addEventListener("keydown", onJump);
}
// update player
export function updatePlayer(delta, speedScale) {
  console.log("Update player!");
  // function call to handle running
  handleRun(delta, speedScale);
  // function call to handle jumping
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  // if player is jumping, set sprite to stationary image
  if (isJumping) {
    playerEl.src = "./assets/player-stationary.png";
    return;
  }
  // animate player sprite based on frame time
  // when current frame time is larger than frame time variable
  if (currentFrameTime >= FRAME_TIME) {
    // update player frame to next frame
    playerFrame = (playerFrame + 1) % PLAYER_FRAME_COUNT;
    // set sprite image
    playerEl.src = `./assets/player-run-${playerFrame}.png`;
    // subtract frame time to reset back to 0
    currentFrameTime -= FRAME_TIME;
  }
  // increment frame time and increase player speed
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  // if not jumping, return
  if (!isJumping) return;

  // if jumping...
  // take bottom position of player and move up or down depending on velocity of player
  incrementCustomProperty(playerEl, "--bottom", yVelocity * delta);
  // end jump: stop player from moving below ground element
  // if the --bottom class property of the player element is less than or equal to 0
  if (getCustomProperty(playerEl, "--bottom") <= 0) {
    // set --bottom class property to 0
    setCustomProperty(playerEl, "--bottom", 0);
    // stop jumping by setting isJumping to false
    isJumping = false;
  }
  // assign value to yVelocity: subtract the product of gravity and delta (for scaling with the frame rate) from the yVelocity
  yVelocity -= GRAVITY * delta;
}

// start jump: set yVelocity to jump
// note: passed in an event listener in setUpPlayer()
function onJump(e) {
  // if user did not press space or is not jumping, return
  if (e.code !== "Space" || isJumping) return;
  // if user pressed space and/or is jumping...
  // set value of yVelocity to JUMP_SPEED
  yVelocity = JUMP_SPEED;
  // set value of isJumping to true
  isJumping = true;
}
