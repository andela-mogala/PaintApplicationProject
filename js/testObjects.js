var rabbit = function() {
  rabbit.prototype.speak = function(statement) {
    console.log(statement);
  };
  
  rabbit.prototype.shout = function(){
    this.speak('Hallo');
  };
};
var r = new rabbit();
r.shout('Hallo');