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
    form.classList.add('hidden');
  };

  var onErrorUploadWizards = function (error) {
    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Произошла ошибка отправки данных: ' + error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), onSuccessUploadWizards, onErrorUploadWizards);
  });
})();
