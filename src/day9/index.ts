import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput.split('\n').map(x => parseInt(x))

const input = prepareInput(readInput())

const PREAMBLE = 25

const goA = (input:number[]) => {

  for (let i = PREAMBLE; i < input.length; i++){
    const preample = input.slice(i-PREAMBLE,i)
    const current = input[i]

    let result = preample.reduce( (acc, v, i) =>
    acc.concat(preample.slice(i+1).map( w => v + w )),
    []);

    if (!result.includes(current)) return current

  }
}

const findRange = (input,invalid) => {
  for (let i = 0; i < input.length; i++){
    for (let x = i+2; x <= input.length; x++){
      const sum = input.slice(i,x).reduce((a,b) => a+b,0)
      if (sum == invalid) return [i,x]
    }
  }
}

const goB = (input:number[], invalid:number) => {

  let range = findRange(input,invalid)
  let list = input.slice(...range)

  return Math.min(...list)+Math.max(...list)
}

/* Tests */

// test()

/* Results */ 

console.time("Time")
const resultA = goA(input)
const resultB = goB(input, resultA)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
