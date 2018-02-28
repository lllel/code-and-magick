'use strict';

(function () {
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.colorize.COAT_COLORS[window.colorize.ColorType.colorCoat - 1]) {
      rank += 2;
    }

    if (wizard.colorEyes === window.colorize.EYES_COLORS[window.colorize.ColorType.colorEye - 1]) {
      rank += 1;
    }

    if (wizard.colorFireball === window.colorize.FIREBALL_COLOR[window.colorize.ColorType.colorFireball - 1]) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;

    } else if (left < right) {
      return -1;

    } else {
      return 0;
    }
  };

  var getFilteredWizards = function () {
    var wizardsItems = window.wizards.slice(0);

    wizardsItems.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    });

    window.similar.addItemsInPage(wizardsItems);
  };

  window.filtered = {
    getFilteredWizards: getFilteredWizards
  };
})();
