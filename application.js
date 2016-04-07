/*
left arrow  37  up arrow  38  right arrow 39  down arrow  40
a 65  w 87  d 68  s 83
*/

var moveLeft = function(fighter){
  var $current_position = $('table').find('.'+ fighter);
  if ($current_position.prev().prop('nodeName') == "TD"){
    $current_position.removeClass(fighter);
    $current_position.prev().addClass(fighter);
  }
}

var moveRight = function(fighter){
  var $current_position = $('table').find('.'+ fighter);
  if ($current_position.next().prop('nodeName') == "TD"){
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
  $(document).on('keyup', function(e){
    if (e.which === 37){
      move('fighter-1', 'left');
    } else if (e.which === 38) {

    } else if (e.which === 39) {
      move('figher-1', 'right');
    } else if (e.which === 40) {

    }

  });
})
