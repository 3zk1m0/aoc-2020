
export default class DefaultDict {
    constructor(defaultInit) {
      return new Proxy({}, {
        get: (target, name) => name in target ?
          target[name] :
          (target[name] = typeof defaultInit === 'function' ?
            new defaultInit().valueOf() :
            defaultInit)
      })
    }
  }
  
  
//   const counts = new DefaultDict(Number)
//   counts.c++
//   console.log(counts.c) // 1
  
//   const lists = new DefaultDict(Array)
//   lists.men.push('bob')
//   lists.women.push('alice')
//   console.log(lists.men) // ['bob']
//   console.log(lists.women) // ['alice']
//   console.log(lists.nonbinary) // []