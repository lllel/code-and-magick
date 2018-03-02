'use strict';

(function () {
  var FORMATS_PICTURE = ['gif', 'jpg', 'jpeg', 'png'];

  var previewAvatar = document.querySelector('.setup-user-pic');
  var uploadInput = document.querySelector('input[type="file"]');
  var openIcon = document.querySelector('.setup-open-icon');

  var onInputFileChange = function () {
    var file = uploadInput.files[0];
    var fileName = file.name;

    if (file) {
      var matches = FORMATS_PICTURE.some(function (it) {
        var regEx = new RegExp('.+\\.' + it);

        return regEx.test(fileName.toLowerCase());
      });
    }

    if (matches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        previewAvatar.src = fileReader.result;
        openIcon.src = fileReader.result;
      });

      fileReader.readAsDataURL(file);
    }
  };
  uploadInput.addEventListener('change', function () {
    uploadInput.accept = '.gif, .jpg, .jpeg, .png';

    onInputFileChange();
  });
})();
