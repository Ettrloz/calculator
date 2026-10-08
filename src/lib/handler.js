import { ref } from 'vue'

/**
 * @param {() => void} onToggleScientific
 */
export function createButtonsHandler(onToggleScientific) {
  const input = ref('0')
  
  function isBeginWithZero() {
    const match = input.value.match(/([0-9]+)$/)
    
    if (!match) {
      return false
    }
    
    return match[1].startsWith('0')
  }
  
  function isEndWithOperators() {
    return /[\+\-\*÷]$/.test(input.value)
  }
  
  function isEndWithOrInvalidComma() {
    const match = input.value.match(/([0-9,]+)$/)
    
    if (!match) {
      return false
    }
    
    const [, expr] = match
    
    if (expr.endsWith(',')) {
      return true
    }
    
    return expr.indexOf(',') !== -1
  }
  
  return {
    /**
     * @param {string} code
     * @param {Event} event
     */
    handler: (code, event) => {
      if (/add|sub|mul|div/.test(code) && isEndWithOperators()) {
        return
      }
      
      switch (code) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (isBeginWithZero()) {
            input.value = input.value.slice(0, -2)
          }
          
          input.value += code;
          
          break
        case 'add':
          input.value += '+'
          
          break
        case 'sub':
          input.value += '-'
          
          break
        case 'mul':
          input.value += '*'
          
          break
        case 'div':
          input.value += '÷'
          
          break
        case 'percent':
          input.value += '%'
          
          break
        case 'comma':
          if (isEndWithOrInvalidComma()) {
            break
          }
          
          input.value += ','
          
          break
        case 'clear':
          input.value = '0'
          
          break
        case 'backspace':
          input.value = input.value.length <= 1 ? '0' : input.value.slice(0, -1)
          
          break
        case 'pi':
          input.value += 'π'
          
          break
        case 'sqrt':
          input.value += '√'
          
          break
        case 'factorial':
          input.value += '!'
          
          break
        case 'exp':
          input.value += '^'
          
          break
        case 'euler':
          input.value += 'e'
          
          break
        case 'lparen':
          input.value += '('
          
          break
        case 'rparen':
          input.value += ')'
          
          break
        case 'inverse':
          input.value += '^(-1)'
          
          break
        case 'sin':
          input.value += 'sin('
          
          break
        case 'cos':
          input.value += 'cos('
          
          break
        case 'tan':
          input.value += 'tan('
          
          break
        case 'lg':
          input.value += 'lg('
          
          break
        case 'ln':
          input.value += 'ln('
          
          break
        case 'toggle-scientific':
          onToggleScientific()
      
          break
      }
    },
    input
  }
}
