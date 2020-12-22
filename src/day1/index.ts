import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput.split('\n').map(x => parseInt(x))

const input = prepareInput(readInput())

const goA = (input) => {

  for (const x of input) {
    for (const y of input) {
      if (x+y == 2020) {
        return x*y
      }
    }
  }

  return 0
}

const goB = (input:number[]) => {
  for (const x of input) {
    for (const y of input) {
      for (const z of input) {
        if (x+y+z == 2020) {
          return x*y*z
        }
      }
    }
  }
}

/* Tests */

// test(878724)

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
