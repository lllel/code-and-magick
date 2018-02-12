'use strict';

(function () {
  var popupOpen = document.querySelector('.setup-open');
  var popupClose = window.util.setup.querySelector('.setup-close');
  var userNameInput = window.util.setup.querySelector('.setup-user-name');

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

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupOpenEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupOpenEscPress);
  });

  popupClose.addEventListener('click', onPopupCloseClick);
  popupClose.addEventListener('keydown', onPopupCloseEnterPress);
  popupOpen.addEventListener('click', onPopupOpenClick);
  popupOpen.addEventListener('keydown', onPopupOpenEnterPress);
})();
