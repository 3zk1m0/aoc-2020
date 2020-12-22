import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => {
  return rawInput.split('\n\n').map(x => x.split('\n'))
}

const input = prepareInput(readInput())

const goA = (input:string[][]) => {

  return input
    .map(x => new Set(x.join('').split('')).size)
    .reduce((x,y) => x+y,0)

}

const goB = (input:string[][]) => {
  
  return input.map(x => {
    let data = [...new Set(x.join('').split('')).keys()]
    for (const person of x) {
      const p = person.split('')
      data = data.filter(letter => p.includes(letter))
    }
    return data.length
  }).reduce((x,y)=> x+y,0)

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
