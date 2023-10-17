// get player element
const playerEl = document.querySelector("[data-player]");
console.log("playerEl", playerEl);

/* initialize constants */
const PLAYER_FRAME_COUNT = 2;
// every animation of our frame will last 1 hundredth of a second
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

// setup player
export function setupPlayer() {
  console.log("Set up player!");
  // set isJumping to false
  isJumping = false;
  // set player frame to 0
  playerFrame = 0;
  // set current frame time to 0
  currentFrameTime = 0;
}
// update player
export function updatePlayer(delta, speedScale) {
  console.log("Update player!");
  // function call to handle running
  handleRun(delta, speedScale);
  // TODO function call to handle jumping
  handleJump();
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

function handleJump() {
  // TODO
}
