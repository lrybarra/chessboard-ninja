// tenley = new Player("Tenley");
// jayda = new Player("Jayda");

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
  $("#0").attr("class","fighter1");
  console.log(count);
  $("#"+(count-1)).attr("class","fighter2");
}

function eventListener(){
  Player.turn.moves;
}

function Player(name) {
  this.name = name;
  this.turn = new Turn();
}

var getCurrentPosition = function(fighter){
  return $('table').find('.' + fighter).attr('id');
};

var moveLeft = function(fighter){
  current_position = getCurrentPosition(fighter);
  next_position = parseInt(current_position) - 1;
  $('td#'+current_position).removeClass(fighter);
  $('td#'+next_position).addClass(fighter);
}

var moveRight = function(fighter){
  current_position = getCurrentPosition(fighter);
  next_position = parseInt(current_position) + 1;
  $('td#'+current_position.toString()).removeClass(fighter);
  $('td#'+next_position.toString()).addClass(fighter);
}

var laser = function(fighter){
  current_position = getCurrentPosition();
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
movelist['moveRight'] = moveRight
movelist['moveLeft'] = moveLeft

var executePlayerOneMoves = function(num){
  movelist[Turn.fighter1_moves[num]]("fighter1");
};

var executePlayerTwoMoves = function(num){
  movelist[Turn.fighter2_moves[num]]("fighter2");
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
  setUpBoard(6,6);

  $("button").on('click', function(button){
    var move = $(this).attr('class')
    moveParse(move);

    if(Turn.done()){
      executer();
    }
  });
});


