'use strict';

(function () {
  var form = window.util.setup.querySelector('.setup-wizard-form');
  var userNameInput = window.util.setup.querySelector('.setup-user-name');

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.modal.onPopupOpenEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.modal.onPopupOpenEscPress);
  });

  var onSuccessUploadWizards = function () {
    window.modal.onPopupCloseClick();
  };

  var onErrorUploadWizards = function (error) {
    window.util.addErrorMessage(error);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessUploadWizards, onErrorUploadWizards);

    evt.preventDefault();

    var wizardCopy = document.querySelector('svg').cloneNode(true);

    wizardCopy.querySelector('#wizard-coat').style.fill = window.colorize.wizardCoat.style.fill;
    wizardCopy.querySelector('#wizard-eyes').style.fill = window.colorize.wizardEyes.style.fill;

    var wizardBase64Right = window.svg2base64.svg2base64(wizardCopy);

    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');

    var wizardBase64Left = window.svg2base64.svg2base64(wizardCopy);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  window.form = {
    form: form
  };
})();
