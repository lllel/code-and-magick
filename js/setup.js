'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var templateWizard = document.querySelector('#similar-wizard-template').content;
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

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

  // ПЕРЕТАСКИВАНИЕ
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target.cloneNode(true);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();

    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'IMG' && evt.target.children.length === 0) {
      evt.target.appendChild(draggedItem);
      evt.target.classList.remove('dragenter-border');
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'DIV' && evt.target.children.length === 0) {
      evt.target.classList.add('dragenter-border');
    }

    if (evt.target.tagName === 'DIV' && evt.target.children.length !== 0) {
      evt.target.classList.add('dragenter-bg-color');
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();

    evt.target.classList.remove('dragenter-border');
    evt.target.classList.remove('dragenter-bg-color');
  });

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    getWizard: getWizard,
    getRenderWizard: getRenderWizard
  };
})();
