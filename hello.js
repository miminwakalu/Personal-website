// let rows = 25

// console.log('For rows = ' + rows)

// for (let row = 1; row <= rows; row++) {
    // console.log(row)
    // let printValue = ''
    // for (let column = 0; column < row; column++) {
    //     printValue += '*'
    // }
    // console.log(printValue)
// }

// let originalString = 'engineer'
// console.log('Original: ' + originalString)
// let reversedString = ''

// for (let character of originalString) {
//     reversedString = character + reversedString
// }

// console.log(reversedString)

let array = ['arrays', 'are', 'iterable']
let characterCount = {}

console.log(array)

for (let element of array) {
    for (let character of element) {
        if (characterCount[character]) {
            characterCount[character] += 1
        } else {
            characterCount[character] = 1
        }
    }
}

console.log(characterCount)