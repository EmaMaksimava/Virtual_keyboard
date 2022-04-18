/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js';
import Key from './Key.js';

const main = create(
  'main',
  '',
  [
    create('h1', 'title', 'Virtual Keuboard'),
    create('h3', 'subtitle', 'Made with quality'),
    create('p', 'hint', 'Use left <kbd>Ctrl</kbd> + <kbd>Alt</kbd> to swith language. Last language saves in LocalStorage'),
  ],
);

export default class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create(
      'textarea',
      'output',
      null,
      main,
      ['placeholder', 'Start type something...'],
      ['rows', 8],
      ['cols', 100],
      ['spellcheck', false],
      ['autocorrect', 'off'],
    );
    this.container = create('div', 'keyboard', null, main, ['language', langCode]);
    document.body.prepend(main);
    return this;
  }

  generateKeyboard() {
    this.keyButtons = [];
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i + 1]);
      rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
      row.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.wrapper);
        }
      });
    });

    document.addEventListener('keydown', this.handlerEvent);
    document.addEventListener('keyup', this.handlerEvent);
  }

  handlerEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    const { code, type } = e;
    const keyObj = this.keyButtons.find((key) => key.code === code);
    if (!keyObj) return;
    this.output.focus();

    if (type.match[/keydown|mousedown/]) {
      if (type.match(/key/)) e.preventDefault();
      keyObj.wrapper.classList.add('active');
    } else if (type.match(/keyup|mouseup/)){
      keyObj.wrapper.classList.remove('active');
    }
  }
}
