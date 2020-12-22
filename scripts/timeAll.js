const { spawn, execSync } = require("child_process")
const { readdirSync } = require("fs")

const days = readdirSync("./src").filter(x => x.slice(0,3) == "day")


console.time("TotalTime")

for (const day of days) {
  console.log(day);
  execSync(`ts-node src/${day}/index.ts`)
}

console.timeEnd("TotalTime")