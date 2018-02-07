'use strict';

var QUANTITY_WIZARD = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ButtonKeyCode = {
  ESC: 27,
  ENTER: 13
};

var setup = document.querySelector('.setup');
var popupOpen = document.querySelector('.setup-open');
var popupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var templateWizard = document.querySelector('#similar-wizard-template').content;
var wizardsContainer = setup.querySelector('.setup-similar-list');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var fragment = document.createDocumentFragment();
var numberColor = 0;

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

var isEscPressEvent = function (evt, action) {
  if (evt.keyCode === ButtonKeyCode.ESC) {

    action();
  }
};

var isEnterPressEvent = function (evt, action) {
  if (evt.keyCode === ButtonKeyCode.ENTER) {

    action();
  }
};

var onPopupOpenEscPress = function (evt) {
  isEscPressEvent(evt, onPopupCloseClick);
};

var onPopupOpenEnterPress = function (evt) {
  isEnterPressEvent(evt, onPopupOpenClick);
};

var onPopupCloseEnterPress = function (evt) {
  isEnterPressEvent(evt, onPopupCloseClick);
};

var onPopupOpenClick = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupOpenEscPress);
  popupOpen.addEventListener('keydown', onPopupOpenEnterPress);
};

var onPopupCloseClick = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupOpenEscPress);
  popupOpen.removeEventListener('keydown', onPopupOpenEnterPress);
  popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
};

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupOpenEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupOpenEscPress);
});

popupClose.addEventListener('click', onPopupCloseClick);
popupClose.addEventListener('keydown', onPopupCloseEnterPress);
popupOpen.addEventListener('click', onPopupOpenClick);
popupOpen.addEventListener('keydown', onPopupOpenEnterPress);

var isChangeColor = function (el, arr) {
  if (numberColor === arr.length) {
    numberColor = 0;
  }
  el.style.fill = arr[numberColor];
  numberColor++;
};

wizardCoat.addEventListener('click', function () {
  isChangeColor(wizardCoat, COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  isChangeColor(wizardEyes, EYES_COLOR);
});

wizardFireball.addEventListener('click', function () {
  if (numberColor > FIREBALL_COLOR.length) {
    numberColor = 0;
  }
  numberColor++;
  wizardFireball.style.backgroundColor = FIREBALL_COLOR[numberColor];
});
