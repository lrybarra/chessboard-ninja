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
  if (current_position != "0"){
    next_position = parseInt(current_position) - 1;
    $('td#'+current_position).removeClass(fighter);
    $('td#'+next_position).addClass(fighter);
  }
}

var moveRight = function(fighter){
  current_position = getCurrentPosition(fighter);
  if (current_position != "35"){
    next_position = parseInt(current_position) + 1;
    $('td#'+current_position.toString()).removeClass(fighter);
    $('td#'+next_position.toString()).addClass(fighter);
  }
}

var laser = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  for(var i = 0; i < (tableRows-1); i++){
    if (fighter == 'fighter1'){
      position = position + tableCols;
    } else {
      position = position - tableCols;
    }
    tdSelect(position).addClass('laser');
  }
};

var clearLaser = function(){
  $('td').removeClass('laser');
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
  if (tdSelect(fighter1_position).hasClass('laser') && tdSelect(fighter2_position).hasClass('laser'))
    {tieGame();
      return "yo"}
  if (tdSelect(fighter1_position).hasClass('laser'))
    {fighter2win();
    return "yo"}
  if (tdSelect(fighter2_position).hasClass('laser'))
    {fighter1win();
    return "yo"}
};

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

function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

var executer = function(){
  console.log("FIGHT!");
  for(var i=0; i<5; i++){
    clearLaser();
    executePlayerOneMoves(i);
    executePlayerTwoMoves(i);
    if (checkForDeath()==="yo"){break;};
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
    if (Turn.fighter1_moves.length < 6){
      Turn.fighter1_moves.push(fighter_move[1])
    } else
    {
      alert("NO MO MOVES YO!");
    };
  };
  if (fighter_move[0] === "fighter2"){
    if (Turn.fighter1_moves.length < 6){
      Turn.fighter2_moves.push(fighter_move[1])
    } else {
      alert("NO MO MOVES YO!");
    };
  };
};

var tableRows = 6;
var tableCols = 6;

$(document).ready(function() {

  setUpBoard(tableRows, tableCols);

  $("button").on('click', function(button){
    var move = $(this).attr('class')
    moveParse(move);

    if(Turn.done()){
      executer();
      // clear turns
    }
  });
});


