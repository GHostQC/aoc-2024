const input = require('../utils/input')

const isAscending = (levels) => {
  if (Math.round(levels[0]) <= Math.round(levels[1])) {
    return true
  }
  return false
}
const stripLevel = (levels, levelId) => {
  levels.splice(levelId,1)
  return levels
}

const validRule1 = (level, next, asc) => {
  //rules #1 - Must be either all asc or all desc
  if (asc) { // asc
    if (Math.round(level) >= Math.round(next)) {
      console.log(`rule1 fail: ${level} is greater or equal to ${next} and the tendency is ascending`)
      return false
    }
  } else { // desc
    if (Math.round(level) <= Math.round(next)) {
      console.log(`rule1 fail: ${level} is lower or equal to ${next} and the tendency is descending`)
      return false
    }
  }
  console.log(`rule1 pass: ${level} is lower than ${next} and the tendency is ${asc ? 'ascending' : 'descending'}`)
  return true
}

const validRule2 = (level, next, prev) => {
  //rules #2 - any 2 adjacent levels differ by at least one and at most 3 ( 1 <= delta <= 3 )
  const delta1 = Math.abs(level - next)
  const delta2 = Math.abs(level - prev)
  let rule2 = true
  if (delta1 < 1 || delta1 > 3) {
    console.log(`rule2 fail: Delta between ${level} and ${next} (${delta1}) is greater than 3 or lower than 1`)
    rule2 = false
  }   
  if (delta2 < 1 || delta2 > 3) {
    console.log(`rule2 fail: Delta between ${level} and ${prev} (${delta2}) is greater than 3 or lower than 1`)
    rule2 = false
  }

  if (rule2) {
    console.log(`rule2 pass: Delta between ${level} and ${next} (${delta1}) & Delta between ${level} and ${prev} (${delta2}) is is at most 3 and at least 1 `)
  }

  return rule2
}

const validReport = (levels) => { 
  const asc = isAscending(levels)
  const fault_ids = []
  for (let i = 0; i < levels.length; i++) {
    let rule1 = true
    let rule2 = true
    // We skip the first and last because we don't need to for calculating the tendency nor the adjacent delta
    if (i === 0 || i === levels.length - 1) {
      continue
    }

    //rules #1 - Must be either all asc or all desc
    if (!validRule1(Math.round(levels[i]), Math.round(levels[i+1]), asc)) {
      rule1 = false
    }
    //rules #2 - any 2 adjacent levels differ by at least one and at most 3 ( 1 <= delta <= 3 )
    if (!validRule2(Math.round(levels[i]), Math.round(levels[i+1]), Math.round(levels[i-1]))) {
      rule2 = false
    }

    if (!rule1 || !rule2) {
      fault_ids.push(i)
    }
  }

  return fault_ids
}


//Parse Input as Array
const data = input.readInput('input.txt')
//const data = input.readInput('example.txt')

const lines = data.split('\n')
const reports = lines.map(line => line.split(' '))

//Iterate through reports to certify safe report and increment count
let safe_reports = 0
let tolerated_reports = 0
for (let i = 0; i < reports.length; i++) {
  console.log(`Report Number ${i+1}`)

  //rule #3 - We tolerate 1 error, we remove that level and recalculate report without it
  console.log('-- FIRST PASS --')
  console.log(reports[i])
  const faults = validReport(reports[i])
  let faultyReports = 0
  if (faults.length > 0) {
    faultyReports++
  }

  if (faultyReports === 0) {
    safe_reports++
    console.log(`Report Number ${i+1} is safe!`)
  } else if (faultyReports === 1) {
    const filteredArr = stripLevel(reports[i],faults[0])
    console.log('-- SECOND PASS --')
    console.log(filteredArr)
    const secondPass = validReport(filteredArr)
    if (secondPass.length === 0) {
      tolerated_reports++
      console.log(`Report Number ${i+1} has error but is safe due to fault tolerancy when removing level #${faults[0]+1}`)
    } else {
      console.log(`Report Number ${i+1} is NOT safe (faulty ids: ${faults})`) 
    }
  } else {
    console.log(`Report Number ${i+1} is NOT safe (faulty ids: ${faults})`)
  }
}

//Output number of valid reports
console.log(`Valid reports: ${safe_reports}`)
console.log(`Tolerated reports: ${tolerated_reports}`)
console.log(`Sum: ${safe_reports+tolerated_reports}`)