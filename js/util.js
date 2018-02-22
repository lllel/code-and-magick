'use strict';

(function () {
  var TIMER_DEBOUNCE = 500;

  var timerId = null;
  var setup = document.querySelector('.setup');

  var ButtonKeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var typeError = {
    'URIError': function (err) {
      throw new ReadError('Ошибка в URI', err);
    },

    'RangeError': function (err) {
      throw new ReadError('Переданный параметр недосягаем', err);
    },

    'ReferenceError': function (err) {
      throw new ReadError('Ошибка разименовании неверной ссылки', err);
    },

    'SyntaxError': function (err) {
      throw new ReadError('Синтаксическая ошибка', err);
    },

    'TypeError': function (err) {
      throw new ReadError('Переменная или параметр неправильного типа', err);
    },

    'default': function (err) {
      throw err;
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

  var debounce = function (func) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, TIMER_DEBOUNCE);
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
    debounce: debounce,
    typeError: typeError,
    setup: setup
  };
})();
