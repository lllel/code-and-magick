'use strict';

(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = window.util.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.util.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball-wrap');
  var numberColor = 0;

  var isChangeColor = function (el, arr) {
    if (numberColor === arr.length) {
      numberColor = 0;
    }
    el.style.fill = arr[numberColor];
    numberColor++;
  };

  wizardCoat.addEventListener('click', function () {
    isChangeColor(wizardCoat, window.setup.COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    isChangeColor(wizardEyes, window.setup.EYES_COLORS);
  });

  wizardFireball.addEventListener('click', function () {
    if (numberColor > FIREBALL_COLOR.length) {
      numberColor = 0;
    }
    numberColor++;
    wizardFireball.style.backgroundColor = FIREBALL_COLOR[numberColor];
  });
})();
