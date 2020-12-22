import { test, readInput } from "../utils/index"

type Command = {
  command: string,
  value: number
}

const prepareInput = (rawInput: string) => rawInput.split("\n").map(x => {
  return {
    command: x.slice(0,1),
    value: parseInt(x.slice(1))
  }
})

const input = prepareInput(readInput())

const Directions = {
  east: [1,0],
  west: [-1,0],
  north: [0,1],
  south: [0,-1],
  E: [1,0],
  W: [-1,0],
  N: [0,1],
  S: [0,-1],
}

const TurnDirection = {
  east: {
    L:"north",
    R:"south"
  },
  west: {
    L:"south",
    R:"north"
  },
  north: {
    L:"west",
    R:"east"
  },
  south: {
    L:"east",
    R:"west"
  },
}

const turn = (direction, cmd:Command) => {

  const degree = cmd.value / 90
  for (const _  of new Array(degree)) {
    direction = TurnDirection[direction][cmd.command]
  }
  return direction
}

const goA = (input:Command[]) => {

  const location = [0,0]
  let direction = "east"

  for (const cmd of input) {
    if (cmd.command == "F"){
      location[0] += Directions[direction][0]*cmd.value
      location[1] += Directions[direction][1]*cmd.value
    }
    if (["R","L"].includes(cmd.command)){
      direction = turn(direction, cmd)
    }
    if (["N","S","E","W"].includes(cmd.command)){
      location[0] += Directions[cmd.command][0]*cmd.value
      location[1] += Directions[cmd.command][1]*cmd.value
    }
  }

  return Math.abs(location[0])+Math.abs(location[1])
}


// .3...
// ....X
// ..O..
// 2....
// ...1.

// [2,1]
// [1,-2]
// [-2,-1]
// [-1,2]

const turnWaypoint = (waypoint, cmd:Command) => {
  const degree = cmd.value / 90
  for (const _  of new Array(degree)) {
    if (cmd.command == "L") {
      waypoint = [
        -waypoint[1],
        waypoint[0]
      ]
    } else {
      waypoint = [
        waypoint[1],
        -waypoint[0]
      ]
    }
  }
  return waypoint
}

const goB = (input:Command[]) => {

  let waypoint = [10,1]
  const location = [0,0]

  for (const cmd of input) {
    if (cmd.command == "F"){
      location[0] += waypoint[0]*cmd.value
      location[1] += waypoint[1]*cmd.value
    }
    if (["R","L"].includes(cmd.command)){
      waypoint = turnWaypoint(waypoint, cmd)
    }
    if (["N","S","E","W"].includes(cmd.command)) {
      waypoint[0] += Directions[cmd.command][0]*cmd.value
      waypoint[1] += Directions[cmd.command][1]*cmd.value
    }
  }

  return Math.abs(location[0])+Math.abs(location[1])
}

/* Tests */

test(turnWaypoint([2,1],{command:"R",value:90}), [1,-2])
test(turnWaypoint([2,1],{command:"R",value:180}), [-2,-1])
test(turnWaypoint([2,1],{command:"R",value:270}), [-1,2])

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
