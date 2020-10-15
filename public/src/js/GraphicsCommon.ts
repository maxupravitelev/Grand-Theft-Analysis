const colorRect = (topLeftX: number, topLeftY: number, boxWidth: number, boxHeight: number, fillColor: string) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

const colorCircle = (centerX: number, centerY: number, radius: number, fillColor: string) => {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};

const drawBitmapCenteredAtLocationWithRotation = (
  graphic: any,
  atX: number,
  atY: number,
  withAngle: number
) => {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX, atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic, -graphic.width / 2, -graphic.height / 2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
};
