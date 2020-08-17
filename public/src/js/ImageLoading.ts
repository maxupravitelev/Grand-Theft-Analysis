let carPic = document.createElement("img");
let car2Pic = document.createElement("img");
let roof = document.createElement("img");
let roof_up = document.createElement("img");

let trackPics = [];

let picsToLoad = 0;

const countLoadedImageAndLaunchIfReady = () => {
  picsToLoad--;
  if (picsToLoad == 0) {
    // last image loaded
    // loadingDoneSoStartGame();
  }
};

const beginLoadingImage = (imgVar, fileName) => {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = fileName;
};

const loadImageForTrackCode = (trackCode, fileName) => {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode], fileName);
};

const loadImages = () => {
  let imageList = [
    { varName: carPic, theFile: "src/images/player1.png" },
    { varName: roof, theFile: "src/images/roof.png" },
    { varName: roof_up, theFile: "src/images/roof_up.png" },

    { trackType: TRACK_ROAD, theFile: "src/images/track_road.png" },
    { trackType: TRACK_WALL, theFile: "src/images/track_wall.png" },
    { trackType: TRACK_GOAL, theFile: "src/images/track_goal.png" },
    { trackType: TRACK_TREE, theFile: "src/images/track_tree.png" },
    { trackType: TRACK_FLAG, theFile: "src/images/track_flag.png" },
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].trackType != undefined) {
      loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList
}; // end of function loadImages
