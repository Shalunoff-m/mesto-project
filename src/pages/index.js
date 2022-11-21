//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей

//  ----------------------------------
// Основной код

class SomeClass {
  static _firstNumber = 55;
  _text2 = "Какой-то текст";

  // static configure(settings) {
  //   this._valueOne = settings.value;
  //   // console.log(this._valueOne);
  // }

  constructor(opt) {
    this._someNumber = this.constructor._firstNumber;
    this._text = this._text2;
    this.val = opt.value;
  }

  showVal() {
    console.log(this._someNumber);
    console.log(this._text2);
    console.log(this.val);
  }
}

// SomeClass.configure({ value: 100 });
const inst = new SomeClass({ value: 100 });
inst.showVal();
