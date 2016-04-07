/*
left arrow  37  up arrow  38  right arrow 39  down arrow  40
a 65  w 87  d 68  s 83
*/

function eventListener(){
  Player.turn.moves
}

function Player(name) {
  this.name = name;
  this.turn = new Turn();
}

function Turn() {
   this.moves = [];
};

Turn.prototype.done = function () {
  this.moves.length === 3;
}

tenley = new Player("Tenley");
jayda = new Player("Jayda");


var moveLeft = function(fighter){
  var $current_position = $('table').find('.'+ fighter);
  if ($current_position.prev().prop('nodeName') === "TD"){
    $current_position.removeClass(fighter);
    $current_position.prev().addClass(fighter);
  }
}

var moveRight = function(fighter){
  var $current_position = $('table').find('.'+ fighter);
  if ($current_position.next().prop('nodeName') === "TD"){
    $current_position.removeClass(fighter);
    $current_position.next().addClass(fighter);
  }
}

var move = function(fighter, direction){
  switch (direction){
    case 'left':
        moveLeft(fighter);
        break;
    case 'right':
        moveRight(fighter);
        break;
  }


}

$(document).ready(function() {
  $(button).on('click', function(button){
    Move = $this.attr('class')
    console.log('class')
    }

  });
})
