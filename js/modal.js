'use strict';

(function () {
  var popupOpen = document.querySelector('.setup-open');
  var popupClose = window.util.setup.querySelector('.setup-close');
  var dialogHandle = document.querySelector('.upload');

  var onPopupOpenEscPress = function (evt) {
    window.util.isEscPressEvent(evt, onPopupCloseClick);
  };

  var onPopupOpenClick = function () {
    window.util.setup.classList.remove('hidden');
    popupOpen.removeEventListener('keydown', onPopupOpenEnterPress);
    document.addEventListener('keydown', onPopupOpenEscPress);
    popupClose.addEventListener('keydown', onPopupCloseEnterPress);
  };

  var onPopupCloseClick = function () {
    window.util.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupOpenEscPress);
    popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
    popupOpen.addEventListener('keydown', onPopupOpenEnterPress);
  };

  var onPopupOpenEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, onPopupOpenClick);
  };

  var onPopupCloseEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, onPopupCloseClick);
  };

  popupClose.addEventListener('click', onPopupCloseClick);
  popupClose.addEventListener('keydown', onPopupCloseEnterPress);
  popupOpen.addEventListener('click', onPopupOpenClick);
  popupOpen.addEventListener('keydown', onPopupOpenEnterPress);

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var flag = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      flag = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.setup.style.top = (window.util.setup.offsetTop - shift.y) + 'px';
      window.util.setup.style.left = (window.util.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (flag) {
        var onClickPreventDefault = function (prevDefEvt) {
          prevDefEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
      }

      dialogHandle.addEventListener('click', onClickPreventDefault);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.modal = {
    onPopupOpenEscPress: onPopupOpenEscPress
  };
})();
