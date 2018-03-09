'use strict';

(function () {
  var DATA_URI_PREFIX = 'data:image/svg+xml;charset=utf-8;base64,';

  var svg2base64 = function (svg) {
    var svgToString = new XMLSerializer().serializeToString(svg);
    var base64 = btoa(svgToString);

    return DATA_URI_PREFIX + base64;
  };

  window.svg2base64 = {
    svg2base64: svg2base64
  };
})();
