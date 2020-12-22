import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => {
  return rawInput.split('\n').map(x => x.repeat(100))
}

const input = prepareInput(readInput())

const goA = (input:string[]) => {

  const pos = [0,0]
  const dir = [3,1]
  let trees = 0

  while (pos[1] < input.length) {
    if (input[pos[1]][pos[0]] == "#") trees++
    pos[0] += dir[0]
    pos[1] += dir[1]
  }



  return trees
}

const goB = (input) => {

  const dir = [[1,1],[3,1],[5,1],[7,1],[1,2]]

  const result = dir.map(element => {
    const pos = [0,0]
    let trees = 0
    while (pos[1] < input.length) {
      if (input[pos[1]][pos[0]] == "#") trees++
      pos[0] += element[0]
      pos[1] += element[1]
    }
    return trees
  });

  return result.reduce((x,y) => x*y,1)
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
