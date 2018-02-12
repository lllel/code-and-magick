'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var templateWizard = document.querySelector('#similar-wizard-template').content;

  var getWizard = function () {
    return {
      name: NAMES[window.util.getRandomNumber(0, NAMES.length - 1)],
      surname: SURNAMES[window.util.getRandomNumber(0, SURNAMES.length - 1)],
      coatColor: COAT_COLORS[window.util.getRandomNumber(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[window.util.getRandomNumber(0, EYES_COLORS.length - 1)]
    };
  };

  var getRenderWizard = function (wizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    getWizard: getWizard,
    getRenderWizard: getRenderWizard
  };
})();
