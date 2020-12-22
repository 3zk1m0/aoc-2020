import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput.split('\n').map(x=>x.split(''))

const input = prepareInput(readInput())

const drawGrid = (grid) => {
  let result = ""
  for (let y in grid) {
    if (parseInt(y) == 20) break
    for (let x in grid) {
      if (parseInt(x) == 20) break
      result += grid[y][x];
    }
    result += "\n";
  }
  console.log(result);
}

const directions = [
  [0,1],[0,-1],[-1,0],[1,0],
  [1,1],[1,-1],[-1,-1],[-1,1]
]


const simulateRound = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid))
    for (let y in grid) {
      for (let x in grid[y]) {
      if (grid[y][x] == ".") continue
      let taken = 0
      for (let d of directions) {
        const xd = parseInt(x)+d[0]
        const yd = parseInt(y)+d[1]
        if (grid[yd] && grid[yd][xd]) {
          if (grid[yd][xd] == "#") taken++
        }
      }
      if (taken >= 4) newGrid[y][x] = "L"
      if (taken == 0) newGrid[y][x] = "#"
    }
  }
  return newGrid
}

const goA = (input) => {

  let data:string[][]
  let newData = JSON.parse(JSON.stringify(input))

  while (JSON.stringify(newData) != JSON.stringify(data)) {
    data = JSON.parse(JSON.stringify(newData))
    newData = simulateRound(data)
  }
  // drawGrid(newData)

  return data.flat(Infinity).filter(x => x == "#").length
}

const simulateRoundTwo = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid))
  for (let y in grid) {
    for (let x in grid[y]) {
      if (grid[y][x] == ".") continue
      let taken = 0
      for (let d of directions) {
        let xd = parseInt(x)+d[0]
        let yd = parseInt(y)+d[1]
        while (grid[yd] && grid[yd][xd]) {
          if (grid[yd][xd] == "#") taken++
          if (grid[yd][xd] == "#") break
          if (grid[yd][xd] == "L") break
          xd += d[0]
          yd += d[1]
        }
      }
      if (taken >= 5) newGrid[y][x] = "L"
      if (taken == 0) newGrid[y][x] = "#"
    }
  }
  return newGrid
}

const goB = (input) => {

  let data:string[][]
  let newData = JSON.parse(JSON.stringify(input))

  while (JSON.stringify(newData) != JSON.stringify(data)) {
    data = JSON.parse(JSON.stringify(newData))
    newData = simulateRoundTwo(data)
  }
  // drawGrid(newData)

  return data.flat(Infinity).filter(x => x == "#").length
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
