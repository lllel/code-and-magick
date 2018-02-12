'use strict';

(function () {
  var setup = document.querySelector('.setup');

  var ButtonKeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var createElemsFragment = function (arr, cb) {
    var elemsFragment = document.createDocumentFragment();

    [].forEach.call(arr, function (el, i) {
      elemsFragment.appendChild(cb(el, i));
    });

    return elemsFragment;
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
    setup: setup
  };
})();
