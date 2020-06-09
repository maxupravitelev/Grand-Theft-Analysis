// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new carClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // canvasContext.canvas.width  = window.innerWidth;
  // canvasContext.canvas.height = window.innerHeight;
  
  canvasContext.canvas.width = 800;
  canvasContext.canvas.height = 600;

  loadImages();
}

function loadingDoneSoStartGame() {

  var framesPerSecond = 60;
  setInterval(function() {
      moveEverything();
      drawEverything();
      
      if (device_id_global != '') { api_loaded = true };
      if ((api_loaded == true) && (spotifyPlayerStarted == false)) { startSpotifyPlayer() };
      if (spotifyPlayerReady == true) { computeRGBvalueFromFlaskData(); }

    }, 1000/framesPerSecond);
  
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
  



  p1.carDraw();



  canvasContext.restore()

  
  canvasContext.fillStyle = "white";
  canvasContext.font = "20px Arial";
  canvasContext.fillText("Counter: " + elapsedTime, 10, 50);






}