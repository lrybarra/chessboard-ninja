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

var clearLaser = function(){
  $('td').removeClass('laser');
  $('td').removeClass('laser2');
  $('td').removeClass('fighter1hitbox');
  $('td').removeClass('fighter2hitbox');
};

var clearBomb = function(){
  $('td').removeClass('bomb');
  $('td').removeClass('fighter1hitbox');
  $('td').removeClass('fighter2hitbox');
};

var clearStaff = function(){
  $('td').removeClass('staff');
  $('td').removeClass('fighter1hitbox');
  $('td').removeClass('fighter2hitbox');
};

var tdSelect = function(position){
  return $('td#'+position.toString())
}

var tieGame = function(){
  alert("TIE GAME");
};
var fighter1win = function(){
  alert("PLAYER 1 WINS");
};
var fighter2win = function(){
  alert("PLAYER 2 WINS");
};

var checkForDeath = function(){
  var fighter1_position = parseInt(getCurrentPosition("fighter1"));
  var fighter2_position = parseInt(getCurrentPosition("fighter2"));
  if (tdSelect(fighter1_position).hasClass('laser2') && tdSelect(fighter2_position).hasClass('laser'))
    {tieGame();
      return true}
  if (tdSelect(fighter1_position).hasClass('fighter2hitbox'))
    {fighter2win();
    return true}
  if (tdSelect(fighter2_position).hasClass('fighter1hitbox'))
    {fighter1win();
    return true}
};

var movelist = new Object()
movelist['laser'] = laser
movelist['bomb'] = bomb
movelist['moveRight'] = moveRight
movelist['moveLeft'] = moveLeft
movelist['moveUp'] = moveUp
movelist['dashRight'] = dashRight
movelist['dashLeft'] = dashLeft
movelist['noMove'] = noMove
movelist['staff'] = staff

var executePlayerOneMoves = function(num){
  var moveName = Turn.fighter1_moves[num]
  var moveFunc = movelist[moveName]
  moveFunc("fighter1");
};

var executePlayerTwoMoves = function(num){
  var moveName = Turn.fighter2_moves[num]
  var moveFunc = movelist[moveName]
  moveFunc("fighter2");
};

var executer = function(i){
  console.log("FIGHT!");
  clearLaser();
  clearBomb();
  clearStaff();
  makeMoves(i);

    if (checkForDeath()===true){
      alert('you dead')
    }

};

var makeMoves = function (turnNumber) {
  executePlayerOneMoves(turnNumber);
  executePlayerTwoMoves(turnNumber);
}


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
    if (Turn.fighter1_moves.length < 5){
      console.log(Turn.fighter1_moves.length);
      Turn.fighter1_moves.push(fighter_move[1])
    } else
    {
      alert("NO MO MOVES YO!");
    };
  };
  if (fighter_move[0] === "fighter2"){
    if (Turn.fighter2_moves.length < 5){
      Turn.fighter2_moves.push(fighter_move[1])
    } else {
      alert("NO MO MOVES YO!");
    };
  };
};

var tableRows = 6;
var tableCols = 6;
var i = 0;

var addToCombatLog = function(msg1, msg2, moveNum){
  $('td#p1c'+i.toString()).text(msg1);
  $('td#p2c'+i.toString()).text(msg2);
};

$(document).ready(function() {

  setUpBoard(tableRows, tableCols);
  $('.next-turn').toggle();

  $("button").on('click', function(button){
    console.log('yo')
    var move = $(this).attr('class');
    moveParse(move);
    if (Turn.done()){
      $('.next-turn').toggle();
    }
  });

  // if(Turn.done()){
  $(".next-turn").on('click', function(button){
    if (i > 4){
      Turn.fighter1_moves = [];
      Turn.fighter2_moves = [];
      alert("GAME OVER!");
    } else {
      addToCombatLog(Turn.fighter1_moves[i], Turn.fighter2_moves[i], i);
      executer(i);
      i = i + 1;
      $('.next-turn').toggle();
    }
  });
    // }

});
