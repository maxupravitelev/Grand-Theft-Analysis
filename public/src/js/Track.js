"use strict";
let TRACK_W = 600;
let TRACK_H = 600;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
let streetNodes = [];
let streetNodeUrl = 'http://localhost:8888/api/maps/overpass/nodesinstreetslim';
const getStreetNodes = async () => {
    const response = await fetch(streetNodeUrl);
    streetNodes = await response.json();
    console.log(streetNodes);
    let slimStreetNodes = streetNodes;
    streetNodes.forEach(street => {
        street.nodes.forEach(node => {
            let stringLat = node.lat.toString();
            let firstDigits = [];
            for (let i = 0; i < stringLat.length; i++) {
                if (stringLat[i] === '.') {
                    break;
                }
                firstDigits.push(stringLat[i]);
            }
            let firstDigitsOfLatitude = Number(firstDigits.join(''));
            node.lat %= firstDigitsOfLatitude;
        });
    });
    console.log(slimStreetNodes);
};
getStreetNodes();
const trackTileToIndex = (tileCol, tileRow) => {
    return tileCol + TRACK_COLS * tileRow;
};
const isTrackAtTileCoord = (trackTileCol, trackTileRow) => {
    let trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
    return trackGrid[trackIndex] == 1;
};
const getTrackAtPixelCoord = (pixelX, pixelY) => {
    let tileCol = pixelX / TRACK_W;
    let tileRow = pixelY / TRACK_H;
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);
    if (tileCol < 0 ||
        tileCol >= TRACK_COLS ||
        tileRow < 0 ||
        tileRow >= TRACK_ROWS) {
        return false;
    }
    let trackIndex = trackTileToIndex(tileCol, tileRow);
    return trackGrid[trackIndex];
};
let currentRGBvalue = "#23FF12";
let activeColor = "blue";
const colorizeTracks = () => {
    let blueCircleX = 9500;
    let blueCircleY = 890;
    let greenCircleX = 9900;
    let greenCircleY = 890;
    let redCircleX = 10300;
    let redCircleY = 890;
    if (p1.carX > blueCircleX &&
        p1.carX < blueCircleX + radius_size / 2 &&
        p1.carY > blueCircleY &&
        p1.carY < blueCircleY + radius_size / 2) {
        activeColor = "blue";
    }
    if (activeColor == "blue") {
        currentRGBvalue = blueValue;
    }
    if (p1.carX > greenCircleX &&
        p1.carX < greenCircleX + radius_size / 2 &&
        p1.carY > greenCircleY &&
        p1.carY < greenCircleY + radius_size / 2) {
        activeColor = "green";
    }
    if (activeColor == "green") {
        currentRGBvalue = greenValue;
    }
    if (p1.carX > redCircleX &&
        p1.carX < redCircleX + radius_size / 2 &&
        p1.carY > redCircleY &&
        p1.carY < redCircleY + radius_size / 2) {
        activeColor = "red";
    }
    if (activeColor == "red") {
        currentRGBvalue = redValue;
    }
    colorCircle(blueCircleX, blueCircleY, radius_size, blueValue);
    colorCircle(greenCircleX, greenCircleY, radius_size, greenValue);
    colorCircle(redCircleX, redCircleY, radius_size, redValue);
    if (streetNodes) {
        streetNodes.forEach((street, index) => {
            let firstNodeX = 9670;
            let firstNodeY = -90;
            let zoomLevel = 100000;
            let nodeX = firstNodeX + ((parseFloat(street.nodes[0].lat) - 52.4) * zoomLevel);
            let nodeY = firstNodeY - ((parseFloat(street.nodes[0].lon) - 13.3) * zoomLevel);
            console.log(nodeX, nodeY);
            colorCircle(nodeX, nodeY, 10, "#FFFFFF");
        });
    }
};
const drawTracks = () => {
    for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            if (isTrackAtTileCoord(eachCol, eachRow)) {
                let trackLeftEdgeX = eachCol * TRACK_W;
                let trackTopEdgeY = eachRow * TRACK_H;
                if ((trackLeftEdgeX >= camPanX - TRACK_W) && (trackLeftEdgeX <= camPanX + canvas.width + TRACK_W)) {
                    if (trackTopEdgeY >= camPanY - TRACK_W) {
                        if (trackTopEdgeY <= camPanY + canvas.height + TRACK_H) {
                            colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, currentRGBvalue);
                            canvasContext.drawImage(roof, trackLeftEdgeX, trackTopEdgeY);
                        }
                    }
                }
            }
        }
    }
};
