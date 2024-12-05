const input = require('../utils/input')

const findAllInstructions = (string, regex) => {
  const matches = [...string.matchAll(regex)]
  return matches
}

//Parse Input as Array
const data = input.readInput('input.txt')
//const data = input.readInput('example.txt')

const lines = data.split('\n')
// Inspect line for well formatted mul(x,y) function
let result = 0
let enabled = true
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  // const doMatches = findAllInstructions(line,/do\(\)/g)
  // doMatches.forEach((m) => {console.log(m)})
  // const dontMatches = findAllInstructions(line,/don\'t\(\)/g)
  // dontMatches.forEach((m) => {console.log(m)})
  // const mulMatches = findAllInstructions(line,/mul\([0-9]+\,[0-9]+\)/g)

  const matches = findAllInstructions(line,/don\'t\(\)|do\(\)|mul\([0-9]+\,[0-9]+\)/g)

  matches.forEach((m) => {
    console.log(`Found instruction: ${m[0]}`)

    // do()
    if (m[0].indexOf('do()') > -1) {
      enabled = true
    }

    // don't()
    if (m[0].indexOf(`don\'t()`) > -1) {
      enabled = false
    }

    // mul()
    if (m[0].indexOf('mul') > -1) {
      if(enabled) {
        console.log('mul() instruction enabled, calculating')
        const coord = m[0].match(/[0-9]+/g)
        const [x,y] = coord
        result = Math.round(result) + (Math.round(x) * Math.round(y))
      } else {
        console.log('mul() instruction disabled, skipping')
      }
    }
  })
}

console.log(`Result of all multiplications in the corrupted memory: ${result}`)