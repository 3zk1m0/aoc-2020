import { test, readInput } from "../utils/index"
import * as _ from "lodash"

const prepareInput = (rawInput: string) => {
  const list = rawInput.split('\n').map(x => {
    const words = x.split(' ')
    let child
    if (words.slice(4).join(' ') == "no other bags.") {
      child = []
    } else {
      child = [...words.slice(4).join(' ').match(/\d\s[A-Za-z0-9]*\s[A-Za-z0-9]*/g)]
    }
    return {
      color: words.slice(0,2).join(' '),
      child: child.map( y => {
        const tmp = y.split(' ')
        return {
          count: parseInt(tmp[0]),
          color: tmp.slice(1,3).join(' ')
        }
      })
    }
  })
  const result = {}
  list.forEach(element => {
    result[element.color] = element.child
  });
  return result
}


const input = prepareInput(readInput())

const canBagContainColorSlow = (color) => {

  if (!input[color]) return false

  const bag = input[color]
  const children = bag.map(x => x.color)

  if (children.includes('shiny gold')) return true
  
  if (children.some(content => canBagContainColor(content))) {
    return true;
  }

  return false

}

const canBagContainColor = _.memoize(canBagContainColorSlow)

const goA = () => {
  const colorsIndex = [...new Set(Object.keys(input).flat())]
  const result = colorsIndex.filter(x => canBagContainColor(x))
  return result.length
}

const countBagSlow = (bag) => {

  let result = 1
  if (bag == 'other bags.') return result

  input[bag].forEach(child => {
    if (child.color != 'other bags.')
      result += child.count * countBag(child.color)
  });

  return result
}

const countBag = _.memoize(countBagSlow)

const goB = () => {
  return countBag('shiny gold')-1
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA()
const resultB = goB()
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
