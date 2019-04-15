// Rover Object Goes Here
// Grid para el movimiento de los Rovers. 1 equivale a obstaculo, 2 equivale a la posición de otro Rover
var grid = [
                   //NORTH
        [2, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
/*WEST*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //EAST
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
];                 //SOUTH

var turn = 1;

var rover1 = {
  name: "Rover1",
  _X: 0,
  _Y: 0,
  direction: "N",
  travelLog: [[0, 0]]
}

var rover2 = {
  name: "Rover2",
  _X: 9,
  _Y: 9,
  direction: "N",
  travelLog: [[9, 9]]
}

// ======================

//Instrucciones
console.log("Puedes mover a los Rovers por turnos, introduce order('instrucciones') para ello.\n Instrucciones validas: \n f: Mueve hacia delante \n b: Mueve hacia atras \n r: Gira a la derecha \n l: Mueve a la izquierda.");

//Esta función llama en casacada todo lo necesario para mover a los Rovers por turnos. 
function order(orden){
  var queRover;
  if (turn===1){
    queRover = rover1;
    moveRover(orden, queRover);
    turn++;
  } else if (turn===2){
    queRover = rover2;
    moveRover(orden, queRover);
    turn--;
  }
}

//Indica que Rover ha de mover. 
function moveRover(orden, queRover){
  grid[queRover._X][queRover._Y] = 0;                 //Cuando el Rover abandona la casilla la marca como 0 para permitir el movimiento de otros Rover
  movement(orden, queRover);
  grid[queRover._X][queRover._Y] = 2;                 //Cuando termina de mover la marca como 2, ocupada por un Rover.
  console.log("The " + queRover.name + " has travelled through: ");
  console.log(queRover.travelLog);
}

//Actualiza el log de posiciones del Rover
function updateTravelLog(queRover){
  queRover.travelLog.push([queRover._X, queRover._Y]);
}

//Comprueba obstaculos, si hay un obstaculo avisa y recupera la última posición valida.
function checkObstacles(queRover){
  if (grid[queRover._X][queRover._Y] === 1){
    queRover._X = queRover.travelLog[queRover.travelLog.length-1][0];
    queRover._Y = queRover.travelLog[queRover.travelLog.length-1][1];
    console.log("There's an obstacle in the way, the Rover can't move through here.");
  } else if(grid[queRover._X][queRover._Y] === 2){
    queRover._X = queRover.travelLog[queRover.travelLog.length-1][0];
    queRover._Y = queRover.travelLog[queRover.travelLog.length-1][1];
    console.log("There's another Rover in the way, the Rover can't move through here.");    
  }
}

//Función principal de movimiento
function movement(orden, queRover){
  for (var i = 0; i<orden.length; i++){ 
  updateTravelLog(queRover);
     switch(orden[i]){
     case "f":
       moveForward(queRover);
       break;
     case "b":
       moveBackward(queRover);
       break;
     case "r":
       turnRight(queRover);
       break;
     case "l":
       turnLeft(queRover);
       break;
     default:
       console.log("You must enter a correct value for the Rover. \n f: Moves forward \n b: Moves backward \n r: Turns Right \n l: Turns left.")
       i=orden.length;
       break;
   }
   console.log("The " + queRover.name + " is at " + "[" +queRover._X +", " + queRover._Y +"]");
  }
 }

 //Funciones desglosadas de movimiento.
function turnLeft(queRover){
  switch(queRover.direction){
    case "N":
      queRover.direction = "W";
      break;
    case "W":
      queRover.direction = "S";
      break;
    case "S":
      queRover.direction = "E";
      break;
    case "E":
      queRover.direction = "N";
      break;
  }
  console.log("The " + queRover.name + " is now heading " + queRover.direction);
}

function turnRight(queRover){
  switch(queRover.direction){
    case "N":
      queRover.direction = "E";
      break;
    case "W":
      queRover.direction = "N";
      break;
    case "S":
      queRover.direction = "W";
      break;
    case "E":
      queRover.direction = "S";
      break;
  }
  console.log("The " + queRover.name +  " is now heading " + queRover.direction);
}

function moveForward(queRover){
  switch(queRover.direction){
    case "N":
     if(queRover._X>0){  
        queRover._X--;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "W":
     if(queRover._Y>0){
        queRover._Y--;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "S":
      if(queRover._X<10){
        queRover._X++;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "E":
     if(queRover._Y<10){
        queRover._Y++;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
  }
}

function moveBackward(queRover){
  switch(queRover.direction){
    case "N":
      if(queRover._Y<10){
        queRover._Y++;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "W":
      if(queRover._X<10){
        queRover._X++;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "S":
      if(queRover._Y>0){  
        queRover._Y--;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
    case "E":
      if(queRover._X>0){
        queRover._X--;
        checkObstacles(queRover);
        break;
      } else {
        console.log("The Rover can't move outside the 10x10 grid.")
        break;
      }
  }
 }

