'use strict';

(function () {
  var getFilteredWizards = function () {
    var wizardsItems = window.wizards.slice(0);

    var coatAndEyeItems = wizardsItems.filter(function (it) {
      return it['colorCoat'] === window.colorize.COAT_COLORS[window.colorize.ColorType.colorCoat - 1] && it['colorEyes'] === window.colorize.EYES_COLORS[window.colorize.ColorType.colorEye - 1];
    });

    var coatItems = wizardsItems.filter(function (it) {
      return it['colorCoat'] === window.colorize.COAT_COLORS[window.colorize.ColorType.colorCoat - 1];
    });

    var eyeItems = wizardsItems.filter(function (it) {
      return it['colorEyes'] === window.colorize.EYES_COLORS[window.colorize.ColorType.colorEye - 1];
    });

    var fireballItems = wizardsItems.filter(function (it) {
      return it['colorFireball'] === window.colorize.FIREBALL_COLOR[window.colorize.ColorType.colorFireball - 1];
    });

    var wizards = coatAndEyeItems.concat(coatItems).concat(eyeItems).concat(fireballItems).concat(wizardsItems);

    window.similar.addItemsInPage(wizards);
  };

  window.filtered = {
    getFilteredWizards: getFilteredWizards
  };
})();
