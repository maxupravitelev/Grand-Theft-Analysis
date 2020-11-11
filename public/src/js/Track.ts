// track constants and variables
let TRACK_W: number = 600;
let TRACK_H: number = 600;
const TRACK_GAP: number = 1;
const TRACK_COLS: number = 20;
const TRACK_ROWS: number = 15;
const trackGrid: number[] = 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD: number = 0;
const TRACK_WALL: number = 1;
const TRACK_PLAYER: number = 2;
const TRACK_GOAL: number = 3;
const TRACK_TREE: number = 4;
const TRACK_FLAG: number = 5;

let streetNodes: object[] = []

let streetNodeUrl: string = 'http://localhost:8888/api/maps/overpass/nodesinstreetslim'
// let streetNodeUrl: string = 'http://localhost:8888/api/maps/overpass/nodesinstreet'
// let streetNodeUrl = 'http://localhost:8888/api/maps/nodesinstreet'

let slimStreetNodes: object[] = []

const getStreetNodes = async () => {
  const response = await fetch(streetNodeUrl)
  
  streetNodes = await response.json();
  console.log(streetNodes) 

  slimStreetNodes = streetNodes;

  // delete first digits before . in lat and lon
  streetNodes.forEach(street => {
    street.nodes.forEach(node => {
      let stringLat = node.lat.toString();
      let stringLon = node.lon.toString();

      let firstDigitsLat = [];
      let firstDigitsLon = [];

      // // handle latitude data
      // for (let i = 0; i < stringLat.length; i++) {
        
      //   if (stringLat[i] === '.') {
      //     break
      //   }
      //   firstDigitsLat.push(stringLat[i]);
      // }
      // let firstDigitsOfLatitude: number = Number(firstDigitsLat.join(''))
      
      // // handle longitude data
      // for (let i = 0; i < stringLon.length; i++) {
        
      //   if (stringLon[i] === '.') {
      //     break
      //   }
      //   firstDigitsLon.push(stringLon[i]);
      // }
      // let firstDigitsOfLongitude: number = Number(firstDigitsLon.join(''))

      // // update new 0. lon and lat data
      // node.lat %= firstDigitsOfLatitude;
      // node.lon %= firstDigitsOfLongitude;

       // handle latitude data
      for (let i = 0; i < stringLat.length; i++) {
        
        if (stringLat[i] === '.') {
          break
        }
        firstDigitsLat.push(stringLat[i]);
      }
      let firstDigitsOfLatitude: number = Number(firstDigitsLat.join(''))
      
      // handle longitude data
      for (let i = 0; i < stringLon.length; i++) {
        
        if (stringLon[i] === '.') {
          break
        }
        firstDigitsLon.push(stringLon[i]);
      }
      let firstDigitsOfLongitude: number = Number(firstDigitsLon.join(''))

      // update new 0. lon and lat data
      node.lat %= firstDigitsOfLatitude;
      node.lon %= firstDigitsOfLongitude;

      let zoomLevel = 10000;

      node.lat *= zoomLevel;
      node.lon *= zoomLevel;
    })
    
  })
  console.log(slimStreetNodes)
}
getStreetNodes();

const trackTileToIndex = (tileCol: number, tileRow: number) => {
  return tileCol + TRACK_COLS * tileRow;
};

const isTrackAtTileCoord = (trackTileCol: number, trackTileRow: number) => {
  let trackIndex: number = trackTileToIndex(trackTileCol, trackTileRow);
  return trackGrid[trackIndex] == 1;
};

const getTrackAtPixelCoord = (pixelX: number, pixelY: number) => {
  let tileCol: number = pixelX / TRACK_W;
  let tileRow: number = pixelY / TRACK_H;

  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the car is within any part of the track wall
  if (
    tileCol < 0 ||
    tileCol >= TRACK_COLS ||
    tileRow < 0 ||
    tileRow >= TRACK_ROWS
  ) {
    return false;
    //  return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
  }
  let trackIndex: number = trackTileToIndex(tileCol, tileRow);
  return trackGrid[trackIndex];
};

let currentRGBvalue: string = "#23FF12";
let activeColor: string = "blue";

const colorizeTracks = () => {
  let blueCircleX: number = 9500;
  let blueCircleY: number = 890;

  let greenCircleX: number = 9900;
  let greenCircleY: number = 890;

  let redCircleX: number = 10300;
  let redCircleY: number = 890;

  if (
    p1.carX > blueCircleX &&
    p1.carX < blueCircleX + radius_size / 2 &&
    p1.carY > blueCircleY &&
    p1.carY < blueCircleY + radius_size / 2
  ) {
    activeColor = "blue";
  }
  if (activeColor == "blue") {
    currentRGBvalue = blueValue;
  }

  if (
    p1.carX > greenCircleX &&
    p1.carX < greenCircleX + radius_size / 2 &&
    p1.carY > greenCircleY &&
    p1.carY < greenCircleY + radius_size / 2
  ) {
    activeColor = "green";
  }

  if (activeColor == "green") {
    currentRGBvalue = greenValue;
  }

  if (
    p1.carX > redCircleX &&
    p1.carX < redCircleX + radius_size / 2 &&
    p1.carY > redCircleY &&
    p1.carY < redCircleY + radius_size / 2
  ) {
    activeColor = "red";
  }

  if (activeColor == "red") {
    currentRGBvalue = redValue;
  }

  colorCircle(blueCircleX, blueCircleY, radius_size, blueValue);
  colorCircle(greenCircleX, greenCircleY, radius_size, greenValue);
  colorCircle(redCircleX, redCircleY, radius_size, redValue);

  // if (slimStreetNodes) {
  //   slimStreetNodes.forEach((street, index) => {

  //     let firstNodeX: number = 9670;
  //     let firstNodeY: number = -90;

  //     let nodeX:number = firstNodeX + street.nodes[0].lat;
  //     let nodeY:number = firstNodeY - street.nodes[0].lon;

  //     // console.log(nodeX, nodeY)
  //     colorCircle(nodeX, nodeY, 10, "#FFFFFF")
  // })
  // }

// for (let j = 0; j < slimStreetNodes.length; j++) {
  for (let i = 0, j = 1; i < slimStreetNodes[j].nodes.length; i++) {
    
    let nodeLat = slimStreetNodes[j].nodes[i].lat;
    let nodeLon = slimStreetNodes[j].nodes[i].lat;

    let nextNodeLat: number;
    let nextNodeLon: number;

    if (i < slimStreetNodes[j].nodes.length - 1) {
      nextNodeLat = slimStreetNodes[j].nodes[i + 1].lat;
      nextNodeLon = slimStreetNodes[j].nodes[i + 1].lon;
    } else {
      nextNodeLat = nodeLat;
      nextNodeLon = nodeLon;
    }

    console.log(nodeLat, nodeLon)
    console.log(nextNodeLat, nextNodeLon)

    canvasContext.beginPath(); 
  
    canvasContext.moveTo(nodeLat, nodeLon);
    
    canvasContext.lineTo(nextNodeLat, nextNodeLon);
  
    canvasContext.strokeStyle = '#FFFFFF';
  
    canvasContext.lineWidth = 5;
    // Make the line visible
    canvasContext.stroke();
  }

// }

};



const drawTracks = () => {
  for (let eachCol: number = 0; eachCol < TRACK_COLS; eachCol++) {
    // in each column...
    for (let eachRow: number = 0; eachRow < TRACK_ROWS; eachRow++) {
      // in each row within that col
      if (isTrackAtTileCoord(eachCol, eachRow)) {
        let trackLeftEdgeX: number = eachCol * TRACK_W;
        let trackTopEdgeY: number = eachRow * TRACK_H;

        // console.log("camPanX:" + camPanX)

        if ((trackLeftEdgeX >= camPanX - TRACK_W) && (trackLeftEdgeX <= camPanX + canvas.width + TRACK_W) ){
          if (trackTopEdgeY >= camPanY - TRACK_W) {
            if (trackTopEdgeY <= camPanY + canvas.height + TRACK_H) {

              colorRect(
                trackLeftEdgeX,
                trackTopEdgeY,
                TRACK_W - TRACK_GAP,
                TRACK_H - TRACK_GAP,
                currentRGBvalue
              );
              canvasContext.drawImage(roof, trackLeftEdgeX, trackTopEdgeY);
            }
          }
        }

      } // end of isTrackAtTileCoord()
    } // end of for eachRow
  } // end of for eachCol



}; // end of drawTracks()
