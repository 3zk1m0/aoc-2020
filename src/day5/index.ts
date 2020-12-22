import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => {
  return rawInput.split('\n')
  // return ["BFFFBBFRRR", //: row 70, column 7, seat ID 567.
  // "FFFBBBFRRR",//: row 14, column 7, seat ID 119.
  // "BBFFBBFRLL"]//: row 102, column 4, seat ID 820.
}

const input = prepareInput(readInput())

const columnRange = [...Array(8).keys()]
const rowRange = [...Array(128).keys()]

const seatIDs = []

const goA = () => {
  const values = input.map(cur => {
    const list = new Array(...cur)
    let row = rowRange.slice()
    let column = columnRange.slice()

    list.forEach(x => {
      const rowHalf = Math.ceil(row.length / 2);
      const columnHalf = Math.ceil(column.length / 2);
      switch (x) {
        case 'B':
          row = row.slice(-rowHalf)
          break;
        case 'F':
          row = row.slice(0,rowHalf)
          break;
        case 'L':
          column = column.slice(0,columnHalf)
          break;
        case 'R':
          column = column.slice(-columnHalf)
          break;
      }
      
    })
    seatIDs.push(row[0]*8+column[0])
    return row[0]*8+column[0]
  },0)

  return Math.max(...values)

}

const goB = () => {
  seatIDs.sort()
  const max = Math.max(...seatIDs)
  for (let x=0; x < max; x++){
    if (!seatIDs.includes(x)){
      if (seatIDs.includes(x-1) && seatIDs.includes(x+1)){
        return x
      }
    }
  }
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
