import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput.split('\n').map(x=> x.replace(/\s/g,""))

const input = prepareInput(readInput())

const evaluate = (calc:string, evalMath:Function) => {
  let offset = 0
  while (calc.includes('(')) {
    const pStart = calc.indexOf('(',offset)
    const pEnd = calc.indexOf(')',pStart)
    const inside = calc.slice(pStart+1,pEnd)
    if (inside.includes('(')) {
      offset = pStart+1
      continue
    }
    const value = evalMath(inside)
    calc = calc.slice(0,pStart) + value + calc.slice(pEnd+1)
  }

  return parseInt(evalMath(calc))
}

const evalMathA = (calc:string) => {
  while (calc.includes('+') || calc.includes('*')) {
    const part = calc.match(/\d+.\d+/g)[0]
    const value = eval(part)
    calc = value + calc.slice(part.length)
  }
  return calc
}

const evalMathB = (calc:string) => {
  while (calc.includes('+')) {
    const part = calc.match(/\d+\+\d+/g)[0]
    const value = eval(part)
    calc = calc.replace(part,value)
  }
  while (calc.includes('*')) {
    const part = calc.match(/\d+\*\d+/g)[0]
    const value = eval(part)
    calc = calc.replace(part,value)
  }
  return calc
}

const goA = (input) => input.reduce((a,b) => a + evaluate(b,evalMathA),0)
const goB = (input) => input.reduce((a,b) => a + evaluate(b,evalMathB),0)

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
