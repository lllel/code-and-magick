'use strict';

(function () {
  var QUANTITY_WIZARD = 4;

  var wizardsContainer = window.util.setup.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var addWizard = function (field) {
    for (var i = 0; i < QUANTITY_WIZARD; i++) {
      fragment.appendChild(window.setup.getRenderWizard(window.setup.getWizard()));
    }
    field.appendChild(fragment);
  };
  addWizard(wizardsContainer);

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
