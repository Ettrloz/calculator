
// TODO: Implement all functions in this module

/**
 * @typedef {Object} ExpressionScannerInstance
 * @property {() => number} getPos
 * @property {() => number} getStartTokenPos
 * @property {() => TokenType} getToken
 * @property {() => string} getTokenValue
 * @property {() => boolean} isEnd
 * @property {() => boolean} isEndToken
 * @property {() => TokenType} scan
 */
 
export const OPERATORS = {
  '+': {
    prec: 40,
    associativity: 'left'
  },
  '-': {
    prec: 40,
    associativity: 'left'
  },
  '*': {
    prec: 50,
    associativity: 'left'
  },
  '/': {
    prec: 50,
    associativity: 'left'
  },
  '^': {
    prec: 70,
    associativity: 'right'
  },
  unary: {
    prec: 60,
    associativity: 'right',
  },
  '!': {
    prec: 75,
    associativity: 'left'
  },
  '%': {
    prec: 75,
    associativity: 'left'
  }
};

/** @enum {string} */
const TokenType = {
  Unknown: 'Unknown',
  Number: 'number',
  Plus: 'plus',
  Minus: 'minus',
  Asterisk: 'asterisk',
  Division: 'division',
  Caret: 'caret',
  Bang: 'bang',
  Percent: 'percent',
  LeftParen: 'left-paren',
  RightParen: 'right-paren',
  Identifier: 'identifier',
  EOF: 'eof'
};

/** @enum {number} */
const CharCode = {
  DigitZero: 0x30,
  DigitNine: 0x39,
  Comma: 0x2c
};

/** @param {number} cp */
function isDigit(cp) {
  return cp >= CharCode.DigitZero && cp <= CharCode.DigitNine
}

/**
 * @param {string} source
 * @return {ExpressionScannerInstance}
 */
export function createExpressionScanner(source) {
  const length = source.length
  
  let pos = 0
  
  /** @type {number} */
  let startTokenPos
  
  /** @type {TokenType} */
  let token
  
  /** @type {string} */
  let tokenValue = ''
  
  function isEnd() {
    return pos >= length
  }
  
  function scan() {
    tokenValue = ''
    
    if (isEnd()) {
      return (token = TokenType.EOF)
    }
    
    startTokenPos = pos;
    
    const cp = source.codePointAt(pos)
    
    if (!cp) {
      throw new Error('Internal Error')
    }
    
    switch (cp) {
      default:
        if (isDigit(cp)) {
          // Last job here
          //
          // Known issue, console appear twice (displayed by
          // Eruda not browser devtools).
          while (source.charCodeAt(pos) === CharCode.Comma || isDigit(source.charCodeAt(pos))) {
            if (tokenValue.includes(',')) {
              throw new Error('Unexpected \',\'')
            }
            
            tokenValue += source[pos++]
          }
          
          return (token = TokenType.Number)
        }
    }
    
    return (pos++, token = TokenType.Unknown)
  }
  
  return {
    getPos: () => pos,
    getStartTokenPos: () => startTokenPos,
    getToken: () => token,
    getTokenValue: () => tokenValue,
    isEnd,
    isEndToken: () => token === TokenType.EOF,
    scan
  }
}

/**
 * @param {string} source
 */
export function parseExpression(source) {
  const scanner = createExpressionScanner(source)
  
  while (!scanner.isEndToken()) {
    console.log(scanner.scan(), scanner.getTokenValue())
  }
  
  return []
}

/**
 * @param {string} source
 */
export function parseAndEvaluateExpression(source) {
  return ''
}
