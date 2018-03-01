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
  });

  window.form = {
    form: form
  };
})();
