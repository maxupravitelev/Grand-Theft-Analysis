// save the canvas for dimensions, and its 2d context for drawing to it
let canvas, canvasContext;

let p1 = new carClass();

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

//   canvasContext.canvas.width  = window.innerWidth;
//   canvasContext.canvas.height = window.innerHeight;
  
  canvasContext.canvas.width = 1280;
  canvasContext.canvas.height = 720;

  loadImages();
}


var currentTime = 0;
var deltaTime = 0;
var pastTime = (new Date()).getTime();
var framesPerSecond = 1 / 60;

function gameloop() {
    currentTime = (new Date()).getTime();
    deltaTime = deltaTime + Math.min(1, (currentTime - pastTime) / 1000);
    while (deltaTime > framesPerSecond) {
        deltaTime = deltaTime - framesPerSecond;
        moveEverything();
    }
    drawEverything();
    if ((device_id_global != '') && (spotifyPlayerStarted == false)) { startSpotifyPlayer() };
    if (spotifyPlayerStartedPlaying == true) { computeRGBvalueFromFlaskData(); computeCircleRadius(); }
    pastTime = currentTime;
    requestAnimationFrame(gameloop);
}

function loadingDoneSoStartGame() {
    requestAnimationFrame(gameloop);
  
      if ((device_id_global != '') && (spotifyPlayerStarted == false)) { startSpotifyPlayer() };
      if (spotifyPlayerStartedPlaying == true) { computeRGBvalueFromFlaskData(); computeCircleRadius(); }
  
  sliderReset();
  p1.carInit(carPic, "Blue Car");
  initInput();  
}

function moveEverything() {
  p1.carMove();
  sliderMove();
  instantCamFollow();

}




function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');


  canvasContext.save(); // needed to undo this .translate() used for scroll
  
  canvasContext.translate(-camPanX,-camPanY);


  drawTracks();
  


//   colorCircle(75, 75, radius_size, 'blue')
  p1.carDraw();



  canvasContext.restore()

  
  canvasContext.fillStyle = "white";
  canvasContext.font = "20px Arial";
  canvasContext.fillText("Counter: " + elapsedTime, 10, 50);






}