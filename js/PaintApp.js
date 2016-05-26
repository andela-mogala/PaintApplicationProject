
//global variables
var canvas;
var context;

//a flag to indicate whether the mouse button has been
// held down prior to dragging
var isDragging = false;

//variable to store the point at which dragging started
var dragStartPoint = 0;

//variable to store the point at which dragging stopped
var dragStopPoint = 0;

//variable to store a snapshot of the canvas
var snapshot;

/*
 * The setup function initializes all variables 
 * and event listeners that will be required 
 * throughout the use of the app
 */
function setup() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.lineCap = 'round';

  //add event listeners to the canvas element
  canvas.addEventListener('mousedown', onDragStart, false);
  canvas.addEventListener('mousemove', onDrag, false);
  canvas.addEventListener('mouseup', onDragStop, false);
}

/*
 * 
 * @param {type} event
 * @returns {PaintApp.getMouseCoordinates.canvasCoords}
 * The getMouseCoordinates method is a helper method that
 * calculates the correct of the mouse relative 
 * to the canvas origin
 */
function getMouseCoordinates(event) {
  var xCoord = event.clientX - canvas.getBoundingClientRect().left;
  var yCoord = event.clientY - canvas.getBoundingClientRect().top;

  //create an object to store the canvas coordinates
  var canvasCoords = {x: xCoord, y: yCoord};
  return canvasCoords;
}

/*
 *This function required the current mouse position
 *as a parameter and uses it to draw a straight line.
 *The line starts drawing from the point the mouse button
 *is held down till it is released. 
 * @param {type} mousePosition
 * @returns {undefined}
 */
function drawLine(mousePosition) {
  context.beginPath();
  context.moveTo(dragStartPoint.x, dragStartPoint.y);
  context.lineTo(mousePosition.x, mousePosition.y);
  context.stroke();
}

/*
 * The drawCircle function requires a parameter which is
 * the current mouse position. Using a formula for calculating
 * the distance between two points, we can deduce the radius of 
 * resulting circle that should be drawn.
 * @param {type} mousePosition
 * @returns {undefined}
 */
function drawCircle(mousePosition) {
  //(The radius will be determined by finding the distance between
  //the point where the mouse is clicked down and where the mouse
  //is released).
  var radius = Math.sqrt(
          Math.pow((dragStartPoint.x - mousePosition.x), 2) + Math.pow((dragStartPoint.y - mousePosition.y), 2)
          );
  context.beginPath();
  context.arc(dragStartPoint.x, dragStartPoint.y, radius, 0, 2 * Math.PI, false);
  context.stroke();
}

/*
 * The drawPolygon function is a reusable function
 * that can render any shape irrespective of the number
 * of sides
 * @param {type} mousePosition
 * @param {type} sides
 * @param {type} angle
 * @returns {undefined}
 */
function drawPolygon(mousePosition, sides, angle) {
  var coordinates = [];
  //to draw any shape we will have to inscribe that shape
  //in a circle. Hence we need to have a radius for the circle
  var radius = Math.sqrt(Math.pow((dragStartPoint.x - mousePosition.x), 2) + Math.pow((dragStartPoint.y - mousePosition.y), 2));

  //determine the coordinates of the edges of the shape
  //so as to be able to draw a lines to connect these points
  for (var index = 0; index < sides; index++) {
    coordinates.push({x: dragStartPoint.x + radius * Math.cos(angle), y: dragStartPoint.y - radius * Math.sin(angle)});
    angle += (2 * Math.PI) / sides;
  }

  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);
  //draw lines to connect all the points
  for (var index = 1; index < sides; index++) {
    context.lineTo(coordinates[index].x, coordinates[index].y);
  }

  context.closePath();
  context.stroke();
}

/*
 * The takeSnapshot function captures an image
 * of the canvas along with the bitmap drawn on it
 * @returns {undefined}
 */
function getCanvasSnapShot() {
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

/*
 * The redrawSnapshot function takes the image stored in
 * the snapshot variable and draws it again on the screen
 * @returns {undefined}
 */
function redrawSnapshot() {
  context.putImageData(snapshot, 0, 0);
}
/*
 * The onDragStart method is called once the mouse 
 * button is pressed down within the canvas
 */
function onDragStart(event) {
  isDragging = true;
  dragStartPoint = getMouseCoordinates(event);

  //as soon as the mouse starts moving we need to 
  //take a snapshot of the canvas and store the image
  getCanvasSnapShot();
}

/*
 * The onDrag method is called repeatedly while 
 * the mouse is being moved around within the canvas
 */
function onDrag(event) {
  if (isDragging) {

    //while dragging the mouse we need to
    //restore the snapshot of the previous image
    //so that we do not have multiple lines
    redrawSnapshot();

    dragStopPoint = getMouseCoordinates(event);
    //drawLine(dragStopPoint);
    drawPolygon(dragStopPoint, 6, Math.PI/4);
  }
}

/*
 * The onDragStop method is called when the mouse
 * button is released.
 */
function onDragStop(event) {
  isDragging = false;
  //we are redrawing the snapshot for the same reason
  //as in the onDrag() function
  redrawSnapshot();
  dragStopPoint = getMouseCoordinates(event);
  //drawLine(dragStopPoint);
  drawPolygon(dragStopPoint, 6, Math.PI/4);
}

//Test program
setup();