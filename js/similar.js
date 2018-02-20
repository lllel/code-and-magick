'use strict';

(function () {
  var QUANTITY_WIZARD = 4;

  var wizardsContainer = window.util.setup.querySelector('.setup-similar-list');

  var onSuccessGetWizards = function (data) {
    try {
      var wizards = JSON.parse(data.slice(0));

    } catch (err) {
      if (err instanceof window.util.typeError[err.name]) {
        window.util.typeError[err.name](err);

      } else {
        window.util.typeError['default'](err);
      }
    }

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

  window.backend.load(onSuccessGetWizards, onErrorGetWizards);
})();
