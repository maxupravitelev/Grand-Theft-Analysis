// save the canvas for dimensions, and its 2d context for drawing to it
let canvas: any, canvasContext: any;

let p1 = new carClass();

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  //   canvasContext.canvas.width  = window.innerWidth;
  //   canvasContext.canvas.height = window.innerHeight;

  canvasContext.canvas.width = 1280;
  canvasContext.canvas.height = 720;

  loadImages();
};

// todo: add eventHandlers for starting gameloop()

let currentTime: number = 0;
let deltaTime: number = 0;
let pastTime = new Date().getTime();
let framesPerSecond: number = 1 / 60;

const gameloop = () => {
  currentTime = new Date().getTime();
  deltaTime = deltaTime + Math.min(1, (currentTime - pastTime) / 1000);
  while (deltaTime > framesPerSecond) {
    deltaTime = deltaTime - framesPerSecond;
    moveEverything();
  }
  drawEverything();
  pastTime = currentTime;
  requestAnimationFrame(gameloop);
};

document.getElementById("startButton").addEventListener("click", () => {
  startSpotifyPlayer();
});

// const loadingDoneSoStartGame = () => {
//     requestAnimationFrame(gameloop);

//       if ((device_id_global != '') && (spotifyPlayerStarted == false)) { startSpotifyPlayer() };
//       if (spotifyPlayerStartedPlaying == true) { computeRGBvalueFromFlaskData(); computeCircleRadius(); }

//   sliderReset();
//   p1.carInit(carPic, "Blue Car");
//   initInput();
// }

const moveEverything = () => {
  p1.carMove();
  sliderMove();
  instantCamFollow();
};

const drawEverything = () => {
  computeRGBvalueFromSpotifyAnalysis();
  computeCircleRadius();

  colorRect(0, 0, canvas.width, canvas.height, "black");

  canvasContext.save(); // needed to undo this .translate() used for scroll

  canvasContext.translate(-camPanX, -camPanY);

  drawTracks();
  colorizeTracks();

  //   colorCircle(75, 75, radius_size, 'blue')
  p1.carDraw();

  canvasContext.restore();

  canvasContext.fillStyle = "white";
  canvasContext.font = "20px Arial";
  canvasContext.fillText("Counter: " + elapsedTime, 10, 50);
};