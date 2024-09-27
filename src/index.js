import {
  validateDot,
  validateDelete,
  validateEnter,
  validateNumbers,
  validateOperations,
  validateChangeSign,
} from './validations'

import './calculation.js'
import './consts.js'
import './validations.js'
import './styles.css'

const input = document.getElementById('input')

document.addEventListener('keydown', event => {
  handleInput(event.key)
})

document.querySelectorAll('button').forEach(button =>
  button.addEventListener('click', e => {
    switch (e.target.innerText) {
      case '×':
        handleInput('*')
        break
      case '÷':
        handleInput('/')
        break
      case '=':
        handleInput('Enter')
        break
      case 'DEL':
        handleInput('Backspace')
        break
      default:
        handleInput(e.target.innerText)
    }
  })
)

function handleInput(symbol) {
  input.innerText =
    (
      validateEnter(symbol) ||
      validateDelete(symbol) ||
      validateOperations(symbol) ||
      validateDot(symbol) ||
      validateNumbers(symbol) ||
      validateChangeSign(symbol)
    )?.join('') || input.innerText
  input.scrollLeft = input.scrollWidth
}
