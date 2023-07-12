// node calc.js sum 3 5 8 
// node calc.js sub 3 5 8 
// node calc.js mul 3 5 8 
// node calc.js div 3 5 8 

const [operator, ...args] = process.argv.slice(2)
// console.log('operator:',operator)
// console.log('args:',args)

const numbers = args.map(Number)
console.log(numbers)

const calaulate = (operator, args ) => {
    const operations = {
        sum: '+',
        sub: '-',
        mul: '*',
        div: '/',
    }

    let sign = operations[operator]

    console.log('sign', sign)
    const result = args.reduce((a,b) => `${a}${sign}${b}`)
   console.log(Number(result))
   return result

}

calaulate(operator, args )