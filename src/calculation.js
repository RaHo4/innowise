import { operations, unchangebleOperations } from './consts.js'
import { equation } from './validations.js'

export function calculate() {
  const firstCalc = []
  const array = [...equation]

  if (operations.includes(array.slice(-1)[0])) array.pop()

  for (let i = 0; i < array.length; i++) {
    // первый проход, выполняем все приоритетные операции
    if (unchangebleOperations.includes(array[i])) {
      let firstNumber = transformNumber(firstCalc.pop())
      let secondNumber = transformNumber(array[i + 1])
      array[i] === '*'
        ? firstCalc.push(`${firstNumber * secondNumber}`)
        : firstCalc.push(`${firstNumber / secondNumber}`)
      i++
    } else if (array[i].split('').filter(a => +a).length)
      firstCalc.push(`${transformNumber(array[i])}`)
    else firstCalc.push(array[i])
  }

  let result = +firstCalc[0]

  for (let i = 0; i < firstCalc.length; i++) {
    // второй проход, выполнение оставшихся операций
    if (operations.includes(firstCalc[i])) {
      result = firstCalc[i] === '-' ? result - +firstCalc[i + 1] : result + +firstCalc[i + 1]
    }
  }
  return [`${result}`]
}

function transformNumber(number) {
  // конвертация в число из строки
  if (number.slice(-1) === '%') {
    number = number.split('')
    number.pop()
    number = number.join('')
    number = +number / 100
  }
  return +number
}
