'use strict';

(function () {
  var templateWizard = document.querySelector('#similar-wizard-template').content;
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  var getRenderWizard = function (wizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // ПЕРЕТАСКИВАНИЕ
  shopElement.addEventListener('dragstart', function (evt) {
    draggedItem = null;

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
    getRenderWizard: getRenderWizard
  };
})();
