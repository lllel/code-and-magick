'use strict';

(function () {
  var templateWizard = document.querySelector('#similar-wizard-template').content;
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  var viewArtifacts = function (artifact) {
    var wizardElement = document.createElement('li');

    wizardElement.textContent = artifact.name;

    return wizardElement;
  };

  var getRenderWizard = function (wizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-artifacts-items').appendChild(window.util.createElemsFragment(wizard.artifacts, viewArtifacts));

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
      evt.target.classList.remove('dragenter-border');
      evt.target.appendChild(draggedItem);
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'DIV' && evt.target.children.length === 0) {
      evt.target.classList.add('dragenter-border');
    }

    if (evt.target.tagName === 'IMG') {
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
