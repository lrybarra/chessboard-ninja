var laser = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  for(var i = 0; i < (tableRows-1); i++){
    if (fighter == 'fighter1'){
      position = position + tableCols;
      tdSelect(position).addClass('laser').addClass(fighter+'hitbox');
    } else {
      position = position - tableCols;
      tdSelect(position).addClass('laser2').addClass(fighter+'hitbox');
    }
  }
};

var staff = function(fighter){
  position = parseInt(getCurrentPosition(fighter));
  if (fighter == 'fighter1'){
   for(var i = 0; i < 36; i++){
    if (Math.floor(i/6-1) === Math.floor(position/6)) {
      tdSelect(i).addClass('staff').addClass(fighter+'hitbox');
      }
    }
  } else {
    for(var i = 0; i < 36; i++){
    if (
      Math.floor(i/6+1) === Math.floor(position/6)) {
      tdSelect(i).addClass('staff').addClass(fighter+'hitbox');
      }
    }
  }
  //tdSelect(position).addClass('laser').addClass(fighter+'hitbox');
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
