import { calculate } from './calculation.js'
import { numbers, operations, unchangebleOperations } from './consts.js'

export let equation = ['0']

export function validateEnter(symbol) {
  if (symbol === 'Enter') {
    equation = calculate()
    return equation
  }
}

export function validateDelete(symbol) {
  if (symbol === 'Backspace') {
    let lastInput = equation.pop()
    if (
      lastInput.split('').filter(a => !numbers.includes(a) && !operations.includes(a)).length >= 3
    )
      equation
    else if (lastInput.length - 1 === 0) equation = [...equation]
    else equation = [...equation, lastInput.slice(0, -1)]

    if (!equation.length) equation = ['0']

    return equation
  }
}

export function validateOperations(symbol) {
  if (operations.includes(symbol)) {
    // валидация ввода операций
    let pop = equation.pop()
    pop = pop.split('')

    let isPopHaveNumber = !!pop.filter(a => numbers.includes(a)).length
    let isPopHavePercent = !!pop.filter(a => a === '%').length
    let isPopConsistOnlyOfUnchangeableOperations =
      pop.filter(a => unchangebleOperations.includes(a)).length === pop.length
    let isPopSameAsInput = pop[pop.length - 1] === symbol && !isPopHaveNumber

    pop = pop.join('')

    if (pop.split('').filter(a => !numbers.includes(a) && !operations.includes(a)).length >= 3)
      equation = ['0']
    else if (!isPopHaveNumber && symbol === '%') {
      // если была введена операция, убираем её и добавляем % к введённому числу
      const number = equation.pop()
      equation = [...equation, number + '%']
    } else if (isPopHaveNumber && symbol !== '%') {
      // если после числа вводится операция, записываем её отдеально
      equation = [...equation, pop, symbol]
    } else if (isPopHavePercent && symbol === '%') {
      // если был введён процент и он уже присутствует, не дублируем его
      equation = [...equation, pop]
    } else if (isPopHaveNumber && symbol === '%') {
      // если был введён процент впервые, записываем к числу
      equation = [...equation, pop + symbol]
    } else if (isPopSameAsInput) {
      // если последний введённый символ такой же, игнорируем
      equation = [...equation, pop]
    } else if (
      isPopConsistOnlyOfUnchangeableOperations &&
      !unchangebleOperations.includes(symbol) &&
      symbol === '-'
    ) {
      // если была введена одна из приоритетных операций и текущий ввод не приоритетен, записываем его
      equation = [...equation, pop + symbol]
    } else if (!isPopSameAsInput) {
      // если ввод не совпадает с текущей операцией, записываем ввод
      equation = [...equation, symbol]
    }
    return equation
  }
}

export function validateNumbers(symbol) {
  if (numbers.includes(symbol)) {
    // валидация ввода чисел
    let lastInput = equation.pop()
    if (
      lastInput.split('').filter(a => !numbers.includes(a) && !operations.includes(a)).length ===
      lastInput.length
    ) {
      equation = [...equation, symbol]
    } else if (lastInput.includes('%')) {
      equation = [...equation, lastInput]
    } else if (lastInput === '0') {
      equation = [...equation, symbol]
    } // запрет ввода нескольких нулей подряд
    else if (lastInput.length > 1 && operations.includes(lastInput[0])) {
      equation = [...equation, lastInput[0], lastInput[1] + symbol]
    } else if (operations.includes(lastInput)) {
      equation = [...equation, lastInput, symbol]
    }
    // добавление цифр к введённому числу
    else
      equation = [
        ...equation,
        lastInput === undefined || lastInput === '0'
          ? symbol // если до ввода текущего числа была операция или текущий символ 0, вводим текущий введённый символ
          : lastInput + symbol, // добавляем цифру к введённому числу
      ]
    return equation
  }
}

export function validateDot(symbol) {
  if (symbol === '.') {
    // валидация ввода запятых
    const lastInput = equation.pop().split('')

    if (
      lastInput?.length &&
      lastInput.filter(a => numbers.includes(a)).length &&
      !lastInput.filter(a => a === '.').length &&
      !lastInput.filter(a => a === '%').length // если последний введённый элемент - число без точек и %, дописываем точку
    ) {
      equation = [...equation, lastInput.join('') + symbol]
    } else equation = [...equation, lastInput.join('')]
    return equation
  }
}

export function validateChangeSign(symbol) {
  if (symbol === '±') {
    const lastInput = equation.pop().split('')

    if (!!lastInput.filter(a => numbers.includes(a)).length && lastInput[0] === '-') {
      equation = [...equation, lastInput.slice(1, lastInput.length).join('')]
    } else if (
      !!lastInput.filter(a => numbers.includes(a)).length &&
      numbers.includes(lastInput[0])
    ) {
      equation = [...equation, '-' + lastInput.join('')]
    } else equation = [...equation, lastInput.join('')]

    return equation
  }
}
