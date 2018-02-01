'use strict';

var QUANTITY_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
var templateWizard = document.querySelector('#similar-wizard-template').content;
var wizardsContainer = setup.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getWizard = function () {
  return {
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
    surname: SURNAMES[getRandomNumber(0, SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandomNumber(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)]
  };
};

var getRenderWizard = function (wizard) {
  var wizardElement = templateWizard.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addWizard = function (field) {
  for (var i = 0; i < QUANTITY_WIZARD; i++) {
    fragment.appendChild(getRenderWizard(getWizard()));
  }
  field.appendChild(fragment);
};
addWizard(wizardsContainer);
