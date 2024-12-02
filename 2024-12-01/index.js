const input = require('../utils/input')
const sort = require('../utils/sort')
const scan = require('../utils/scan')

const data = input.readInput('input.txt', 'utf8');
//const data = input.readInput('example.txt')

const listA = []
const listB = []
const pairs = []

// -- Part 1 -- //
//Parse input into 2 lists
const lines = data.split('\n')
lines.forEach((line) => {
    const data = line.split(' ')
    listA.push(data[0])
    listB.push(data[3])
  }
)

//Order list (listA asc, listB desc)
const orderedListA = sort.quickSort(listA)
const orderedListB = sort.quickSort(listB)

//Create pairs between both list
const arrLength = listA.length >= listB ? listA.length : listB.length
for (let i = 0; i < arrLength; i++) {
  pairs.push([orderedListA[i], orderedListB[i]])
}
//Calculate distance between each pairs
//Print the sum of distances as result
let sum = 0
pairs.forEach((pair) => {
  sum += Math.abs(pair[0] - pair[1])
})
console.log(`Total distance between each pair in the lists: ${sum}`)

// -- Part 2 -- //

// Create map of listA element as k and their occurance in listB as v
// score = k * v
// Return sum(score)
const occurance = []
listA.forEach((element) => {
  occurance.push([element,scan.getElementOccurance(listB, element)])
})


sum = 0
occurance.forEach((set) => {
  const value = Math.round(set[1]) !== -1 ? Math.round(set[1]) : 0
  sum += Math.round(set[0]) * value
})
console.log(`Total similarity score: ${sum}`)
