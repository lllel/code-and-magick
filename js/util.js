'use strict';

(function () {
  var setup = document.querySelector('.setup');

  var ButtonKeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var typeError = {
    'URIError': function (e) {
      throw new ReadError('Ошибка в URI', e);
    },

    'RangeError': function (e) {
      throw new ReadError('Переданный параметр недосягаем', e);
    },

    'ReferenceError': function (e) {
      throw new ReadError('Ошибка разименовании неверной ссылки', e);
    },

    'SyntaxError': function (e) {
      throw new ReadError('Синтаксическая ошибка', e);
    },

    'TypeError': function (e) {
      throw new ReadError('Переменная или параметр неправильного типа', e);
    },

    'default': function (e) {
      throw e;
    }
  };

  var ReadError = function (message, cause) {
    this.name = 'ReadError';
    this.message = message;
    this.cause = cause;
    this.stack = cause.stack;
  };

  var createElemsFragment = function (arr, cb) {
    var elemsFragment = document.createDocumentFragment();

    [].forEach.call(arr, function (el, i) {
      elemsFragment.appendChild(cb(el, i));
    });

    return elemsFragment;
  };

  var getRandomElementArr = function (arr, quantity) {
    var arrCopy = arr.slice(0);
    var randomItems = [];
    var i = 0;

    while (i < quantity) {
      var randomItem = arrCopy.splice(getRandomNumber(0, arrCopy.length - 1), 1);

      randomItems.push(randomItem[0]);
      i++;
    }

    return randomItems;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var isEscPressEvent = function (evt, cb) {
    if (evt.keyCode === ButtonKeyCode.ESC) {

      cb();
    }
  };

  var isEnterPressEvent = function (evt, cb) {
    if (evt.keyCode === ButtonKeyCode.ENTER) {

      cb();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    isEscPressEvent: isEscPressEvent,
    isEnterPressEvent: isEnterPressEvent,
    createElemsFragment: createElemsFragment,
    getRandomElementArr: getRandomElementArr,
    typeError: typeError,
    setup: setup
  };
})();
