var PaintApp = function(canvas) {
  //global variables
  this.canvas = canvas;
  this.context;

  /*
   * The setup function initializes all variables 
   * and event listeners that will be required 
   * throughout the use of the app
   */
  this.setup = function() {
    context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.lineCap = 'round';

    //add event listeners to the canvas element
    canvas.addEventListener('mousedown', this.onDragStart, false);
    canvas.addEventListener('mousemove', this.onDrag, false);
    canvas.addEventListener('mouseup', this.onDragStop, false);
  };

  /*
   * The onDragStart method is called once the mouse 
   * button is pressed down within the canvas
   */
  this.onDragStart = function(event) {
    console.log('Dragging Started');
  };

  /*
   * The onDrag method is called repeatedly while 
   * the mouse is being moved around within the canvas
   */
  this.onDrag = function(event) {
    console.log('Dragging');
  };
  
  /*
   * The onDragStop method is called when the mouse
   * button is released.
   */
  this.onDragStop = function(event) {
    console.log('Dragging Stopped');
  };
};

//Test program
var can = document.getElementById('canvas');
var paint = new PaintApp(can);
paint.setup();