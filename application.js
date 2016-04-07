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

// function Player(name){
//   this.name = name;
//   this.turn = new Turn();
// }

// tenley = new Player("Tenley");
// jayda = new Player("Jayda");


var moveLeft = function(fighter){
  // var $current_position = $('table').find('.'+ fighter);
  // if ($current_position.prev().prop('nodeName') === "TD"){
  //   $current_position.removeClass(fighter);
  //   $current_position.prev().addClass(fighter);
  // }
}

var moveRight = function(fighter){
  // var $current_position = $('table').find('.'+ fighter);
  // if ($current_position.next().prop('nodeName') === "TD"){
  //   $current_position.removeClass(fighter);
  //   $current_position.next().addClass(fighter);
  // }
}

var laser = function(fighter){
  console.log("pew")
}

// var move = function(fighter, direction){
//   switch (direction){
//     case 'left':
//         moveLeft(fighter);
//         break;
//     case 'right':
//         moveRight(fighter);
//         break;
//   }
// };

var movelist = new Object()
movelist['laser'] = laser

var executePlayerOneMoves = function(num){
  console.log(Turn.fighter1_moves[num]);
};

var executePlayerTwoMoves = function(num){
  console.log(Turn.fighter2_moves[num]);
};

var checkForDeath = function(){
  console.log("CHECK FOR DEATH!");
};

var executer = function(){
  console.log("FIGHT!");
  for(var i=0; i<5; i++){
    executePlayerOneMoves(i);
    executePlayerTwoMoves(i);
    checkForDeath();
  }
};

var Turn = {
   fighter1_moves: [],
   fighter2_moves: [],
   done: function(){
    return (this.fighter1_moves.length >=5 && this.fighter2_moves.length >=5)
  }
};

var moveParse = function(move){
  var fighter_move = move.split("-");
  if (fighter_move[0] === "fighter1"){
    Turn.fighter1_moves.push(fighter_move[1])
  };
  if (fighter_move[0] === "fighter2"){
    Turn.fighter2_moves.push(fighter_move[1])
  };
};

$(document).ready(function() {
  setUpBoard(8,8);

  $("button").on('click', function(button){
    var move = $(this).attr('class')
    moveParse(move);

    if(Turn.done()){
      executer();
    }
  });
});


