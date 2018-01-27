'use strict';

window.renderStatistics = function (ctx, names, times) {
  var WIDTH_RECT = 420;
  var HEIGHT_RECT = 270;
  var WIDTH_BETWEEN_HISTAGRAMM = 50;
  var SHIFT = 10;

  var currentX = 110;
  var currentY = 10;
  var heightColumn = 150;
  var widthColumns = 40;
  var initialX = 90;
  var initialY = 250;
  var maxTime = 0;

  var renderRect = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var renderText = function (text, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getMaxNumber = function (arr) {
    maxTime = Math.max.apply(null, arr);

    return maxTime;
  };
  getMaxNumber(times);

  renderRect(currentX + SHIFT, currentY + SHIFT, WIDTH_RECT, HEIGHT_RECT, 'rgba(0, 0, 0, 0.7)');
  renderRect(currentX, currentY, WIDTH_RECT, HEIGHT_RECT, '#ffffff');

  ctx.font = '16px PT Mono';

  renderText('Ура, вы победили!', currentX + 50, currentY + 20, '#000000');
  renderText('Список результатов:', currentX + 50, currentY + 40, '#000000');

  var step = heightColumn / maxTime;

  names.forEach(function (it, i) {
    ctx.fillStyle = (it === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 20, 160,' + (getRandomNumber(20, 100) / 100) + ')';

    renderRect(initialX += (WIDTH_BETWEEN_HISTAGRAMM + widthColumns), initialY - (step * times[i]), widthColumns, step * times[i]);

    renderText(names[i], initialX, heightColumn + 120, 'grey');

    renderText(times[i].toFixed(0), initialX, heightColumn - (step * times[i]) + 90, 'grey');
  });
};
