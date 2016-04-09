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

var noMove = function(fighter){
  // nothin yo
}
