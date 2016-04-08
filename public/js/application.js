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

var noMove = function(fighter){
  // nothin yo
}

var moveRight = function(fighter){
  current_position = getCurrentPosition(fighter);
  if (current_position != "35"){
    next_position = parseInt(current_position) + 1;
    $('td#'+current_position).removeClass(fighter);
    $('td#'+next_position).addClass(fighter);
  }
}

var moveLeft = function(fighter){
  current_position = getCurrentPosition(fighter);
  if (current_position != "0"){
    next_position = parseInt(current_position) - 1;
    $('td#'+current_position).removeClass(fighter);
    $('td#'+next_position).addClass(fighter);
  }
}

var dashRight = function(fighter){
  current_position = getCurrentPosition(fighter);
  if (current_position != "35"){
    next_position = parseInt(current_position) + 2;
    $('td#'+current_position.toString()).removeClass(fighter);
    $('td#'+next_position.toString()).addClass(fighter);
  }
};

var dashLeft = function(fighter){
  current_position = getCurrentPosition(fighter);
  if (current_position != "0"){
    next_position = parseInt(current_position) - 2;
    $('td#'+current_position).removeClass(fighter);
    $('td#'+next_position).addClass(fighter);
  }
}

var moveUp = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  tdSelect(position).removeClass(fighter);
  if (fighter == 'fighter1'){
    position = position + tableCols;
  } else {
    position = position - tableCols;
  }
  tdSelect(position).addClass(fighter);
};

var laser = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  for(var i = 0; i < (tableRows-1); i++){
    if (fighter == 'fighter1'){
      position = position + tableCols;
    } else {
      position = position - tableCols;
    }
    tdSelect(position).addClass('laser').addClass(fighter+'hitbox');
  }
};

var staff = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  if (fighter == 'fighter1'){
   for(var i = 0; i < 36; i++){
    if (Math.floor(i/6-1) === Math.floor(position/6)) {
      tdSelect(i).addClass('bomb').addClass(fighter+'hitbox');
      }
    }
  } else {
    for(var i = 0; i < 36; i++){
    if (
      Math.floor(i/6+1) === Math.floor(position/6)) {
      tdSelect(i).addClass('bomb').addClass(fighter+'hitbox');
      }
    }
  }
  tdSelect(position).addClass('laser').addClass(fighter+'hitbox');
};

var bomb = function(fighter){
  if (fighter == 'fighter1'){
    // 0 29 31
    position = parseInt(getCurrentPosition('fighter1'));
    bomb_pos1 = (position + (tableCols * (tableRows-1))) + 1;
    bomb_pos2 = (position + (tableCols * (tableRows-1))) - 1;
  } else {
    position = parseInt(getCurrentPosition('fighter2'));
    bomb_pos1 = (position - (tableCols * (tableRows-1))) + 1;
    bomb_pos2 = (position - (tableCols * (tableRows-1))) - 1;
  }
  tdSelect(bomb_pos1).addClass('bomb').addClass(fighter+'hitbox');
  tdSelect(bomb_pos2).addClass('bomb').addClass(fighter+'hitbox');
};

var clearLaser = function(){
  $('td').removeClass('laser');
  $('td').removeClass('fighter1hitbox');
  $('td').removeClass('fighter2hitbox');
};

var clearBomb = function(){
  $('td').removeClass('bomb');
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
  if (tdSelect(fighter1_position).hasClass('laser') && tdSelect(fighter2_position).hasClass('laser'))
    {tieGame();
      return "yo"}
  if (tdSelect(fighter1_position).hasClass('fighter2hitbox'))
    {fighter2win();
    return "yo"}
  if (tdSelect(fighter2_position).hasClass('fighter1hitbox'))
    {fighter1win();
    return "yo"}
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

var ajaxPause = function(){
  var request = $.ajax({
    method: 'get',
    url: '/pause',
    async: 'false'
  })

 request.done(function(msg){});


  request.fail(function(msg){
    alert("FUCK YOURSELF!");
  });
}

// var executer = function(){
//   console.log("FIGHT!");
//   for(var i=0; i<5; i++){
//     var delay = 800 * (i+1)
//     setTimeout(clearLaser, delay)
//     makeMoves(i);

//     if (checkForDeath()==="yo"){
//       break;
//     }

//   }
// };

var executer = function(i){
  console.log("FIGHT!");
  clearLaser();
  clearBomb();
  makeMoves(i);

    if (checkForDeath()==="yo"){
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
    if (Turn.fighter1_moves.length < 6){
      console.log(Turn.fighter1_moves.length);
      Turn.fighter1_moves.push(fighter_move[1])
    } else
    {
      alert("NO MO MOVES YO!");
    };
  };
  if (fighter_move[0] === "fighter2"){
    if (Turn.fighter2_moves.length < 6){
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
