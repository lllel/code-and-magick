'use strict';

(function () {
  var QUANTITY_WIZARD = 4;

  var wizardsContainer = window.util.setup.querySelector('.setup-similar-list');

  var onSuccessGetWizards = function (data) {
    var wizards = JSON.parse(data.slice(0));

    var elemsFragment = window.util.createElemsFragment(window.util.getRandomElementArr(wizards, QUANTITY_WIZARD), window.setup.getRenderWizard);

    wizardsContainer.appendChild(elemsFragment);
  };

  var onErrorGetWizards = function (error) {
    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Произошла ошибка отправки данных: ' + error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');

  try {
    window.backend.load(onSuccessGetWizards, onErrorGetWizards);

  } catch (err) {
    if (err instanceof window.util.typeError[err.name]) {
      window.util.typeError[err.name](err);

    } else {
      window.util.typeError['default'](err);
    }
  }
})();
