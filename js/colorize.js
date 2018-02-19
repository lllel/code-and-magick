'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = window.util.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.util.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball-wrap');

  var ColorType = {
    colorCoat: 0,
    colorEye: 0,
    colorFireball: 0
  };

  var isChangeColor = function (el, arr, numberColor) {
    if (numberColor === arr.length) {
      numberColor = 0;
    }

    if (el.style.fill) {
      el.style.fill = arr[numberColor];
      numberColor++;

    } else {
      el.style.backgroundColor = arr[numberColor];
      numberColor++;
    }

    return numberColor;
  };

  wizardCoat.addEventListener('click', function () {
    isChangeColor(wizardCoat, COAT_COLORS, ColorType.colorCoat);
  });

  wizardEyes.addEventListener('click', function () {
    isChangeColor(wizardEyes, EYES_COLORS, ColorType.colorEye);
  });

  wizardFireball.addEventListener('click', function () {
    isChangeColor(wizardFireball, FIREBALL_COLOR, ColorType.colorFireball);
  });
})();
