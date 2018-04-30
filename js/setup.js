'use strict';

(function () {
  var templateWizard = document.querySelector('#similar-wizard-template').content;

  var viewArtifacts = function (artifact) {
    var wizardElement = document.createElement('li');

    wizardElement.textContent = artifact.name;

    return wizardElement;
  };

  var getRenderWizard = function (wizard) {
    var wizardElement = templateWizard.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-artifacts-items').appendChild(window.util.createElemsFragment(wizard.artifacts, viewArtifacts));

    return wizardElement;
  };

  // ПЕРЕТАСКИВАНИЕ
  var DropArtifacts = function (options) {
    var self = this;

    this.elem = options.elem;
    this.artifactsContainer = this.elem.querySelector('.setup-artifacts');
    this.cellInContainer = this.artifactsContainer.querySelectorAll('.setup-artifacts-cell');
    this.dragObject = {};

    this.onMouseDown = function (evt) {
      evt.preventDefault();

      if (evt.which !== 1) {
        return null;
      }

      var elem = evt.target.closest('.shop-img');

      // Нельзя повторно передвигать элемент, пока он находится в движении
      if (elem.classList.contains('move')) {
        return null;
      }

      if (!elem) {
        return null;
      }

      // Начальные данные
      self.dragObject.elem = elem;
      self.dragObject.downX = evt.pageX;
      self.dragObject.downY = evt.pageY;
      self.dragObject.width = elem.offsetWidth;
      self.dragObject.height = elem.offsetHeight;
      self.dragObject.left = elem.getBoundingClientRect().left - this.elem.getBoundingClientRect().left;
      self.dragObject.top = elem.getBoundingClientRect().top - this.elem.getBoundingClientRect().top;

      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mouseup', this.onMouseUp.bind(this));

      return false;
    };

    this.onMouseMove = function (evt) {
      evt.preventDefault();

      if (!self.dragObject.elem) {
        return null;
      }

      if (!self.dragObject.avatar) {
        var shiftX = evt.pageX - self.dragObject.downX;
        var shiftY = evt.pageY - self.dragObject.downY;

        // Если сдвиг менее 3пх, то ничего не делаем
        if (Math.abs(shiftX) < 3 && Math.abs(shiftY) < 3) {
          return null;
        }

        this.dragObject.avatar = self.createAvatar();

        // Если попали мимо аватара
        if (!self.dragObject.avatar) {
          self.dragObject = {};

          return null;
        }

        // Центр захвата
        self.dragObject.shiftX = evt.clientX - self.dragObject.elem.getBoundingClientRect().left;
        self.dragObject.shiftY = evt.clientY - self.dragObject.elem.getBoundingClientRect().top;

        self.startDrag(evt);

        // Скрываем главный элемент, дальше работаем с аватаром
        self.dragObject.elem.parentNode.removeChild(self.dragObject.elem);
      }

      // Разница от центра захвата
      var newX = evt.clientX - self.dragObject.shiftX + pageXOffset - 13; // !!!
      var newY = evt.clientY - self.dragObject.shiftY + pageYOffset - 10; // !!!
      var scrollY;
      var scrollX;

      // Скролл при перемещении за границы окна
      if (newY + self.dragObject.avatar.offsetHeight > document.documentElement.clientHeight) {
        scrollY = newY + self.dragObject.avatar.offsetHeight - document.documentElement.clientHeight;

        if (scrollY < 0) {
          scrollY = 0;
        }

        scrollY = Math.min(scrollY, 10);
        window.scrollBy(0, scrollY);
        newY = Math.min(newY, document.documentElement.clientHeight - self.dragObject.avatar.offsetHeight);
      }

      if (newY - window.pageYOffset < 0) {
        scrollY = Math.min(-newY + window.pageYOffset, 10);
        newY = window.pageYOffset;

        if (scrollY < 0) {
          scrollY = 0;
        }

        window.scrollBy(0, -scrollY);
        newY = Math.max(newY, 0);
      }

      if (newX - window.pageXOffset < 0) {
        scrollX = Math.min(-newX + window.pageXOffset, 10);
        newX = window.pageXOffset;

        if (scrollX < 0) {
          scrollX = 0;
        }

        window.scrollBy(-scrollX, 0);
        newX = Math.max(newX, 0);
      }

      if (newX + self.dragObject.avatar.offsetWidth > document.documentElement.clientWidth) {
        scrollX = newX + self.dragObject.avatar.offsetWidth - document.documentElement.clientWidth;

        if (scrollX < 0) {
          scrollX = 0;
        }

        scrollX = Math.min(scrollX, 10);
        window.scrollBy(scrollX, 0);
        newX = Math.min(newX, document.documentElement.clientWidth - self.dragObject.avatar.offsetWidth);
      }

      self.dragObject.avatar.style.left = newX + 'px';
      self.dragObject.avatar.style.top = newY + 'px';

      // Стили подсветки
      this.addStyle(evt);

      return false;
    };

    this.onMouseUp = function (evt) {
      // Выравниваем аватар относительно контейнера, так как его координаты были относительно боди
      if (self.dragObject.avatar) {
        self.dragObject.avatar.style.top = evt.clientY - (this.elem.getBoundingClientRect().top - this.dragObject.elem.offsetHeight) - 35 + 'px';

        self.dragObject.avatar.style.left = evt.clientX - (this.elem.getBoundingClientRect().left - this.dragObject.elem.offsetWidth) - 35 + 'px';

        self.finishDrag(evt);
      }

      if (self.dragObject.elem) {
        self.dragObject = {};
      }

      if (evt.target.parentNode === document) {
        return null;
      }

      document.removeEventListener('mousemove', self.onMouseMove.bind(self));
      document.removeEventListener('mouseup', self.onMouseUp.bind(self));
    };
  };

  DropArtifacts.prototype.findDroppable = function (evt) {
    this.dragObject.avatar.style.display = 'none';

    var elem = document.elementFromPoint(evt.clientX, evt.clientY);

    this.dragObject.avatar.style.display = 'block';

    if (elem === null) {
      return null;
    }

    return elem.closest('.setup-artifacts .setup-artifacts-cell');
  };

  DropArtifacts.prototype.createAvatar = function () {
    var avatar = this.dragObject.elem.cloneNode(true);
    var elem = this.dragObject.elem;

    var old = {
      parent: elem.parentNode,
      nextSibling: elem.nextElementSibling,
      left: this.dragObject.left,
      top: this.dragObject.top
    };

    avatar.rollback = function () {
      old.parent.insertBefore(avatar, old.nextSibling);

      avatar.style.transition = '0.3s ease';
      avatar.style.position = 'absolute';
      avatar.style.zIndex = '9999';
      avatar.classList.add('move');
      avatar.classList.remove('avatar');

      var long;
      var stepX;
      var stepY;
      var timerId = null;

      var moveX = old.left;
      var moveY = old.top;
      var max = Math.max(Math.abs(moveX), Math.abs(moveY));
      var min = Math.min(Math.abs(moveX), Math.abs(moveY));
      var steps = Math.floor(max / 5);
      var minStep = min / steps;

      if(max > min) {
        long = 'left';
      }

      else {
        long = 'top';
      }

      if(long === 'left') {
        stepX = moveX > 0 ? -5 : 5;
        stepY = moveY > 0 ? -minStep : minStep;
      }

      else {
        stepY = moveY > 0 ? -5 : 5;
        stepX = moveX > 0 ? -minStep : minStep;
      }

      var moveBack = function me() {
        if(max > 10) {
          avatar.style.left = parseFloat(avatar.style.left) + stepX + 'px';
          avatar.style.top = parseFloat(avatar.style.top) + stepY + 'px';
          max -= 10;
          timerId = setTimeout(me, 5);

        } else {
          avatar.style.left = old.left + 'px';
          avatar.style.top = old.top + 'px';
          max = 0;
          timerId = null;

          setTimeout(function () {
            avatar.classList.remove('move');
          }, 500)
        }
      };

      moveBack();
    };

    return avatar;
  };

  DropArtifacts.prototype.startDrag = function () {
    var avatar = this.dragObject.avatar;

    avatar.classList.add('avatar');
    avatar.style.position = 'absolute';

    document.body.appendChild(avatar);
  };

  DropArtifacts.prototype.finishDrag = function (evt) {
    var dropElement = this.findDroppable(evt);

    if (!dropElement || dropElement.children.length !== 0) {
      this.dragCancel();

    } else {
      this.dragEnd(dropElement, this.dragObject.avatar);
    }
  };

  DropArtifacts.prototype.dragEnd = function (dragObj, dropElem) {
    var avatar = this.dragObject.avatar;

    avatar.classList.remove('avatar');

    dragObj.appendChild(dropElem);

    avatar.style.position = 'static';

    // Удаляем ненужные стили с ячеек
    if (avatar.parentNode.classList.contains('dragenter-border')) {
      avatar.parentNode.className = 'setup-artifacts-cell dropzone';
    }

    self.dragObject = {};
  };

  DropArtifacts.prototype.dragCancel = function () {
    this.dragObject.avatar.rollback();
  };

  DropArtifacts.prototype.addStyle = function (evt) {
    [].forEach.call(this.cellInContainer, function (it) {
      it.className = 'setup-artifacts-cell dropzone';
    });

    this.dragObject.avatar.style.display = 'none';

    var elem = document.elementFromPoint(evt.clientX, evt.clientY);

    this.dragObject.avatar.style.display = 'block';

    if (!elem) {
      return null;
    }

    if (elem.className === 'setup-artifacts-cell dropzone') {
      elem.className = 'setup-artifacts-cell dropzone dragenter-bg-color dragenter-border';
    }
  };

  DropArtifacts.prototype.init = function () {
    var self = this;

    this.elem.addEventListener('mousedown', function (evt) {
      if (evt.target.closest('.shop-img')) {
        self.onMouseDown(evt);
      }
    });
  };

  var dropArtifacts = new DropArtifacts({
    elem: document.querySelector('.setup-artifacts-container')
  });

  dropArtifacts.init();

  window.setup = {
    getRenderWizard: getRenderWizard
  };
})();
