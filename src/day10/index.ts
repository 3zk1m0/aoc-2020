import { test, readInput } from "../utils/index"
import * as _ from 'lodash'


const prepareInput = (rawInput: string) => rawInput.split('\n').map(x=>parseInt(x))

const input = prepareInput(readInput())

const goA = (input:number[]) => {

  const data = input.slice()
  data.sort((a,b)=>a-b)

  const result = data.reduce((x,y) => {
    const tmp = {...x, joltage: y}
    tmp[y-x.joltage]++
    return tmp
  },{joltage:0, 1:0, 2:0, 3:1})

  return result[1]*result[3]
}


const goB = (input:number[]) => {

  const data = input.slice()
  data.sort((a,b)=>a-b)
  data.unshift(0)

  const size = data.length
  const countList = new Array(size).fill(0)
  countList[0] = 1

  for (let i=1; i < size; i++){
    for (let j=0; j < i; j++) {
      if (data[i] - data[j] <= 3) {
        countList[i] += countList[j]
      }
    }
  }

  return countList[size - 1]
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
