'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = window.util.setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.util.setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball-wrap');

  var ColorType = {
    colorCoat: 1,
    colorEye: 1,
    colorFireball: 1
  };

  var isChangeColor = function (el, arr, numberColor) {
    if (numberColor === arr.length) {
      numberColor = 0;
    }

    if (el.tagName === 'DIV') {
      el.style.backgroundColor = arr[numberColor];
      numberColor++;

    } else {
      el.style.fill = arr[numberColor];
      numberColor++;
    }

    return numberColor;
  };

  wizardCoat.addEventListener('click', function () {
    ColorType.colorCoat = isChangeColor(wizardCoat, COAT_COLORS, ColorType.colorCoat);
    window.util.debounce(window.filtered.getFilteredWizards);
  });

  wizardEyes.addEventListener('click', function () {
    ColorType.colorEye = isChangeColor(wizardEyes, EYES_COLORS, ColorType.colorEye);
    window.util.debounce(window.filtered.getFilteredWizards);
  });

  wizardFireball.addEventListener('click', function () {
    ColorType.colorFireball = isChangeColor(wizardFireball, FIREBALL_COLOR, ColorType.colorFireball);
    window.util.debounce(window.filtered.getFilteredWizards);
  });

  window.colorize = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLOR: FIREBALL_COLOR,
    ColorType: ColorType,
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    wizardFireball: wizardFireball
  };
})();
