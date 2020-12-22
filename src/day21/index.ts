import * as _ from "lodash"
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string):Input[] => rawInput.split('\n').map(x => {
  const allergens = x.match(/\(.*\)/g)[0].slice(10,-1).match(/\w+/g)
  // const allergens = x.match(/\(.*\)/g)[0].slice(1,-1).split(' ').slice(1)
  const ingredients = x.split("(")[0].split(' ').slice(0,-1)
  // console.log(allergens3)
  return {
    allergens, ingredients
  }
})

type Input = {
  allergens: string[]
  ingredients: string[]
}

const input = prepareInput(readInput())


const count = {}
const allergens = {}
const goA = (input:Input[]) => {

  input.forEach(x => {
    const ingredients = new Set(x.ingredients)

    x.allergens.forEach(x => {
      if (x in allergens)
        allergens[x] = allergens[x].filter(x => ingredients.has(x))
      else
        allergens[x] = [...ingredients]
    })

    x.ingredients.forEach(x => {
      if (x in count)
        count[x]++
      else
        count[x] = 1
    })
  })

  Object.keys(allergens).forEach(x => {
    allergens[x].forEach(x => {
      delete count[x]
    });
  })

  return Object.values<number>(count).reduce((a,b)=>a+b,0)
}

const goB = (input) => {

  const canon = []

  while (canon.length != Object.keys(allergens).length) {
    Object.keys(allergens).forEach(i => {
      if (allergens[i].length == 1) {
        const x = allergens[i].pop()
        canon.push([i,x])
        Object.keys(allergens).forEach(i => {
          if (allergens[i].includes(x)) {
            allergens[i] = allergens[i].filter(y => y != x)
          }
        })
      }
    })
  }

  return canon.sort((a,b) => {
    if ( a[0] < b[0] ) return -1;
    if ( a[0] > b[0] ) return 1;
    return 0;
  }).map(x => x[1]).join()
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
