// Rover Object Goes Here
// ======================
var grid = [
                      //NORTH
           [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
           [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
   /*WEST*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //EAST
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];                    //SOUTH

var _X = 0;
var _Y = 0;
var rover = {
  direction: "N",
  position: [[_X], [_Y]],
  travelLog: [[0, 0]]
}

// ======================


function turnLeft(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  console.log("The Rover is now heading " + rover.direction);
}

function turnRight(rover){
  switch(rover.direction){
    case "N":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
  }
  console.log("The Rover is now heading " + rover.direction);
}

function moveForward(rover){
  switch(rover.direction){
    case "N":
     if(_X>0){  
        _X--;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "W":
     if(_Y>0){
        _Y--;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "S":
      if(_X<10){
        _X++;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "E":
     if(_Y<10){
        _Y++;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
  }
  console.log("The Rover is now at " + "["+_X+", "+_Y+"]");
  recordLog(rover);
}

function moveBackward(rover){
  switch(rover.direction){
    case "N":
      if(_Y<10){
        _Y++;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "W":
      if(_X<10){
        _X++;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "S":
      if(_Y>0){  
        _Y--;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
    case "E":
      if(_X>0){
        _X--;
        updatePosition(rover);
        checkObstacles(rover);
        break;
      } else {
        console.log("El Rover no puede moverse fuera de la rejilla")
        break;
      }
  }
  console.log("The Rover is now at " + "["+_X+", "+_Y+"]");
  recordLog(rover);
}

function movement(order){
 for (var i = 0; i<order.length; i++){ 
  switch(order[i]){
    case "f":
      moveForward(rover);
      break;
    case "b":
      moveBackward(rover);
      break;
    case "r":
      turnRight(rover);
      break;
    case "l":
      turnLeft(rover);
      break;
    default:
      console.log("Debe introducir un valor valido para el Rover. \n f: Mueve hacia delante \n b: Mueve hacia atras \n r: Gira a la derecha \n l: Mueve a la izquierda.")
      i=order.length;
      break;
  }
 }
 console.log("El Rover ha viajado a través de las siguientes coordenadas");
 console.log(rover.travelLog);
}  

function recordLog(rover){
  rover.travelLog.push([_X, _Y])
}

function checkObstacles(rover){
  if(grid[_X][_Y]===1){
    console.log("Hay un obstaculo en el camino, el Rover no puede desplazarse en esa dirección.");
    _X=rover.travelLog[rover.travelLog.length-1][0];
    _Y=rover.travelLog[rover.travelLog.length-1][1];    
  }
}

function updatePosition(rover){
  rover.position= [[_X],[_Y]];
}