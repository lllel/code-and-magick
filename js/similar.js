'use strict';

(function () {
  var QUANTITY_WIZARD = 4;

  var wizardsContainer = window.util.setup.querySelector('.setup-similar-list');

  var addItemsInPage = function (arr) {
    var anyItems = arr.slice(0, QUANTITY_WIZARD);
    var elemsFragment = window.util.createElemsFragment(anyItems, window.setup.getRenderWizard);

    wizardsContainer.innerHTML = '';
    wizardsContainer.appendChild(elemsFragment);
  };

  var onSuccessGetWizards = function (data) {
    window.wizards = JSON.parse(data.slice(0));

    addItemsInPage(window.wizards);
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

  window.similar = {
    addItemsInPage: addItemsInPage
  };
})();
