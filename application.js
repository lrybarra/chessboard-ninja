/*
left arrow  37  up arrow  38  right arrow 39  down arrow  40
a 65  w 87  d 68  s 83
*/

function setUpBoard(rows, columns) {

  var container = $(".container");
  var table = "<table class='board'></table>";
  container.append(table);
  var count = 0;
  for (var r = 0; r< rows; r++) {
    $(".board").append("<tr id='row"+r+"'></tr>");
    for (var c = 0; c < columns; c++) {
      $("#row"+r).append("<td id='"+count+"'></td>");
      count++;
    }
  }
  $("#0").attr("class","fighter-1");
  console.log(count);
  $("#"+(count-1)).attr("class","fighter-2");
}



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
  $("button").on('click', function(button){
    Move = $this.attr('class')
    console.log('class')
    })

  setUpBoard(8,8);

  });

