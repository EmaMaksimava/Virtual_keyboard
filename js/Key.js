import create from './utils/create';

export default class Key {
  constructor({ standart, shift, code }) {
    this.standart = standart;
    this.shift = shift;
    this.code = code;
    this.isFnKey = Boolean(standart.match(/Control|Alt|Space|Arrow|Caps|Shift|Enter|Back|Delete|Tab|Meta/));

    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.sub = create('div', 'sub', this.shift);
    } else {
      this.sub = create('div', 'sub', '');
    }

    this.letter = create('div', 'letter', standart);
    this.wrapper = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code]);
  }
}
