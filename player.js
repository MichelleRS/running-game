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

/* export functions */
// setup player
export function setupPlayer() {
  // initialize player state
  // not jumping
  isJumping = false;
  // start with the first frame of the player
  playerFrame = 0;
  // reset the time since last frame change
  currentFrameTime = 0;
  // reset vertical velocity for jump calculations
  yVelocity = 0;

  // align player with ground
  setCustomProperty(playerEl, "--bottom", 0);

  // prepare player for jump actions
  // remove any existing keydown event to avoid duplicates
  document.removeEventListener("keydown", onJump);
  document.removeEventListener("click", onJump);
  document.removeEventListener("touchstart", onJump);

  // enable jump on mouse click
  document.addEventListener("click", onJump);
  // enable jump on touch for mobile devices
  document.addEventListener("touchstart", onJump);
  // enable jump on key press (spacebar or up arrow)
  document.addEventListener("keydown", onJump);
}

// update player
export function updatePlayer(delta, speedScale) {
  // function call to handle running
  handleRun(delta, speedScale);
  // function call to handle jumping
  handleJump(delta);
}

// get dimension values of player element to use for collision detection
export function getPlayerRect() {
  return playerEl.getBoundingClientRect();
}

// settings for when player loses
export function setPlayerLose() {
  // change player image
  playerEl.src = "./assets/player-lose.png";
}

/* local functions */
function handleRun(delta, speedScale) {
  // if player is jumping, set sprite to stationary image
  if (isJumping) {
    playerEl.src = "./assets/player-jump.png";
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

function onJump(e) {
  // check if already jumping
  if (isJumping) return;

  // handle keyboard events
  if (e.type === "keydown" && e.code !== "Space" && e.code !== "ArrowUp")
    return;

  // set jump physics after confirming valid input (keyboard, click, or touch)
  yVelocity = JUMP_SPEED;
  isJumping = true;

  // prevent default for touch events to avoid scrolling
  if (e.type === "touchstart") {
    e.preventDefault();
  }
}
