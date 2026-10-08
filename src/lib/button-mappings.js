import { Expand, Delete, Pi, Radical, Shrink, Superscript } from '@lucide/vue'
import { computed, ref } from 'vue'

/** @import { Component, Ref } from 'vue' */

/**
 * @typedef {Object} ButtonMap
 * @property {Component | string} value
 * @property {string} [className]
 * @property {string} [label]
 * @property {(event: Event) => void} handle
 */ 

/**
 * @param {(code: string, event: Event) => void} handler
 * @param {boolean} [scientific=false]
 * @return {ButtonMap[]}
 */
export function getButtonMappings(handler, scientific = false) {
  /**
   * @param {ButtonMap[]} maps
   * @return {ButtonMap[]}
   */
  function onlyScientific(maps) {
    if (!scientific) {
      return []
    }
    
    return maps
  }
  
  return [
    ...onlyScientific([
      {
        value: '2nd',
        label: 'Second',
        handle: event => handler('2nd', event),
        className: 'button-extra'
      },
      {
        value: 'deg',
        handle: event => handler('deg', event),
        className: 'button-extra'
      },
      {
        value: 'sin',
        handle: event => handler('sin', event),
        className: 'button-extra'
      },
      {
        value: 'cos',
        handle: event => handler('cos', event),
        className: 'button-extra'
      },
      {
        value: 'tan',
        handle: event => handler('tan', event),
        className: 'button-extra'
      },
      {
        value: Superscript,
        label: 'Exponent',
        handle: event => handler('exp', event),
        className: 'button-extra'
      },
      {
        value: 'lg',
        handle: event => handler('lg', event),
        className: 'button-extra'
      },
      {
        value: 'ln',
        handle: event => handler('ln', event),
        className: 'button-extra'
      },
      {
        value: '(',
        label: 'Left Parenthesis',
        handle: event => handler('lparen', event),
        className: 'button-extra'
      },
      {
        value: ')',
        label: 'Right Parenthesis',
        handle: event => handler('rparen', event),
        className: 'button-extra'
      },
      {
        value: Radical,
        label: 'Square Root',
        handle: event => handler('sqrt', event),
        className: 'button-extra'
      }
    ]),
    {
      value: 'AC',
      label: 'Clear',
      handle: event => handler('clear', event),
      className: 'button-subtle'
    },
    {
      value: Delete,
      label: 'Backspace',
      handle: event => handler('backspace', event),
      className: 'button-subtle'
    },
    {
      value: '%',
      label: 'Percent',
      handle: event => handler('percent', event),
      className: 'button-accent'
    },
    {
      value: '÷',
      label: 'Divide',
      handle: event => handler('div', event),
      className: 'button-accent'
    },
    ...onlyScientific([
      {
        value: 'x!',
        label: 'Factorial',
        handle: event => handler('factorial', event),
        className: 'button-extra'
      }
    ]),
    {
      value: '7',
      handle: event => handler('7', event)
    },
    {
      value: '8',
      handle: event => handler('8', event)
    },
    {
      value: '9',
      handle: event => handler('9', event)
    },
    {
      value: '×',
      label: 'Multiply',
      handle: event => handler('mul', event),
      className: 'button-accent'
    },
    ...onlyScientific([
      {
        value: '1/x',
        label: 'Reciprocal Function',
        handle: event => handler('inverse', event),
        className: 'button-extra'
      }
    ]),
    {
      value: '4',
      handle: event => handler('4', event)
    },
    {
      value: '5',
      handle: event => handler('5', event)
    },
    {
      value: '6',
      handle: event => handler('6', event)
    },
    {
      value: '-',
      label: 'Subtract',
      handle: event => handler('sub', event),
      className: 'button-accent'
    },
    ...onlyScientific([
      {
        value: Pi,
        label: 'PI',
        handle: event => handler('pi', event),
        className: 'button-extra'
      }
    ]),
    {
      value: '1',
      handle: event => handler('1', event)
    },
    {
      value: '2',
      handle: event => handler('2', event)
    },
    {
      value: '3',
      handle: event => handler('3', event)
    },
    {
      value: '+',
      label: 'Add',
      handle: event => handler('add', event),
      className: 'button-accent'
    },
    {
      value: scientific  ? Shrink : Expand,
      handle: event => handler('toggle-scientific', event)
    },
    ...onlyScientific([
      {
        value: 'e',
        label: 'Euler',
        handle: event => handler('euler', event)
      }
    ]),
    {
      value: '0',
      handle: event => handler('0', event)
    },
    {
      value: ',',
      label: 'Comma',
      handle: event => handler('comma', event)
    },
    {
      value: '=',
      label: 'Equal',
      handle: event => handler('equal', event),
      className: 'button-accent'
    }
  ]
}

/**
 * @param {(code: string, event: Event) => void} handler
 * @param {Ref<boolean>} scientific
 */
export function getAndAttachEventButtonMappings(handler, scientific) {
  const mappings = computed(() => getButtonMappings(handler, scientific.value))
  
  return mappings
}
