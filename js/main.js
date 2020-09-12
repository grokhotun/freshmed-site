"use strict";

var inputsFilter = function inputsFilter() {
  document.querySelectorAll('.js-only-digits').forEach(function (item) {
    item.addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  });
};

var formValidation = function formValidation() {
  var forms = document.querySelectorAll('.form');
  var passwords = document.querySelectorAll('#password, #confirmPassword');
  forms.forEach(function (formItem) {
    var pristine = new Pristine(formItem);
    formItem.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = pristine.validate();

      if (valid) {
        formItem.submit();
      } else {
        setTimeout(function () {
          pristine.reset();
        }, 5000);
      }
    });
  });
};

var inputMasking = function inputMasking() {
  document.querySelectorAll('.js-mask-phone').forEach(function (item) {
    item.addEventListener('input', function (e) {
      VMasker(e.target).maskPattern("(999) 999-99-99");
    });
  });
};

var popups = function popups() {
  var popups = document.querySelectorAll('.popup');
  var popupOpenLinks = document.querySelectorAll('.js-popup-open');
  var popupCloseLinks = document.querySelectorAll('.js-popup-close');
  var lockPadding = document.querySelectorAll('.lock-padding');
  var body = document.querySelector('body');
  var lockPaddingOffset = null;
  var burger = null;
  var isTransitioning = false;
  var shouldUnlock = false;

  function _bodyLock() {
    lockPaddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach(function (element) {
        element.style.paddingRight = lockPaddingOffset;
      });
    }

    body.style.paddingRight = lockPaddingOffset;
    body.classList.add('lock');
  }

  function _bodyUnlock() {
    isTransitioning = false;

    if (shouldUnlock) {
      body.style.paddingRight = '0px';
      body.classList.remove('lock');

      if (lockPadding.length > 0) {
        lockPadding.forEach(function (element) {
          element.style.paddingRight = '0px';
        });
      }

      shouldUnlock = false;
    }
  }

  function _popupOpen(openingPopup) {
    if (!isTransitioning) {
      isTransitioning = true;
      var popupActive = document.querySelector('.popup.is-opened');

      if (popupActive) {
        _popupClose(popupActive, false);
      }

      openingPopup.scrollTo(0, 0);
      openingPopup.classList.add('is-opened');

      _bodyLock();
    }
  }

  function _popupClose(closingPopup) {
    var unlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!isTransitioning) {
      isTransitioning = true;
      burger = document.querySelector('.burger.is-active');
      closingPopup.classList.remove('is-opened');

      if (unlock && !burger) {
        shouldUnlock = true;
      }
    }
  }

  function init() {
    if (popupOpenLinks.length > 0) {
      popupOpenLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();
          var openingPopup = document.querySelector(popupLink.getAttribute('href'));

          if (openingPopup) {
            _popupOpen(openingPopup);
          }
        });
      });
    }

    if (popupCloseLinks.length > 0) {
      popupCloseLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();

          _popupClose(popupLink.closest('.popup'));
        });
      });
    }

    if (popups.length > 0) {
      popups.forEach(function (element) {
        element.addEventListener('transitionend', function (e) {
          if (e.propertyName === 'transform') {
            _bodyUnlock();
          }
        });
        element.addEventListener('click', function (e) {
          if (!e.target.closest('.popup__body')) {
            _popupClose(e.target.closest('.popup.is-opened'));
          }
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
          var openedPopup = document.querySelector('.popup.is-opened');

          if (openedPopup) {
            _popupClose(openedPopup);
          }
        }
      });
    }
  }

  init();
};

var imgToBackground = function imgToBackground() {
  document.querySelectorAll(".ibg").forEach(function (el) {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
    }
  });
};

var burgerMenu = function burgerMenu(className) {
  var burger = document.querySelector('.burger');
  var burgerMenu = document.querySelector(".".concat(className));

  if (burgerMenu) {
    burger.addEventListener('click', function (e) {
      burger.classList.toggle('is-active');
      burgerMenu.classList.toggle('is-shown');
    });
    document.querySelector('.js-burger-close').addEventListener('click', function (e) {
      burger.classList.remove('is-active');
      burgerMenu.classList.remove('is-shown');
    });
  }
};

var sliders = function sliders() {
  var sliderBanner = new Swiper('.banner-slider__container', {
    navigation: {
      prevEl: '.banner-slider__arrow--prev',
      nextEl: '.banner-slider__arrow--next'
    },
    pagination: {
      el: '.banner-slider__pagination',
      type: 'bullets'
    },
    slidesPerView: 1
  });
  var sliderActions = new Swiper('.actions-slider__container', {
    loop: true,
    pagination: {
      el: '.actions-slider__pagination',
      type: 'bullets'
    },
    spaceBetween: 0,
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      1343: {
        slidesPerView: 3
      }
    }
  });
  var sliderSimilars = new Swiper('.slider-similars__container', {
    loop: true,
    navigation: {
      nextEl: '.slider-similars__arrow--next',
      prevEl: '.slider-similars__arrow--prev'
    },
    spaceBetween: 45,
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1343: {
        slidesPerView: 4
      }
    }
  });
  var sliderTestimonials = new Swiper('.slider-testimonials__container', {
    loop: true,
    pagination: {
      el: '.slider-testimonials__pagination',
      type: 'bullets'
    },
    spaceBetween: 60,
    slidesPerView: 1,
    breakpoints: {
      1470: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
};

var smoothScroll = function smoothScroll(duration) {
  var linksNav = document.querySelectorAll('.js-smoothscroll-btn');
  linksNav.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(e.target.getAttribute('href'));
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }, false);
  });
};

var yandexMaps = function yandexMaps() {
  function init() {
    var footerMap = new ymaps.Map('yamap-footer', {
      center: [47.822373, 35.170355],
      zoom: 16
    });
    var contactsMap = new ymaps.Map('yamap-contacts', {
      center: [47.822373, 35.170355],
      zoom: 16
    });
  }

  ymaps.ready(init);
};

var preloader = function preloader() {
  var preloaderBody = document.querySelector('.preloader__body');
  var preloader = document.querySelector('.preloader');
  var body = document.querySelector('body');

  if (preloader) {
    body.classList.add('lock');
    new Promise(function (resolve) {
      setTimeout(resolve, 800);
    }).then(function () {
      preloaderBody.style.display = 'none';
      preloader.classList.add('is-loaded');
      body.classList.remove('lock');
    });
  }
};

;

var dropdownMenu = function dropdownMenu() {
  var dropdownMenu = document.querySelector('.js-dropdown-menu');
  var dropdownBtn = document.querySelector('.js-dropdown-menu-btn');

  if (dropdownMenu) {
    dropdownBtn.addEventListener('click', function (e) {
      e.preventDefault();
      dropdownMenu.classList.toggle('is-opened');
      dropdownBtn.classList.toggle('is-active');
    });
  }

  document.querySelector('body').addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.menu-bot-header__item')) {
      dropdownMenu.classList.remove('is-opened');
      dropdownBtn.classList.remove('is-active');
    }
  });
};

var selectors = function selectors() {
  document.querySelectorAll('.selector').forEach(function (select) {
    var selectCurrent = select.querySelector('.selector__current > span'),
        selectCurrentButton = select.querySelector('.selector__current'),
        selectList = select.querySelector('.selector__options'),
        selectInput = select.querySelector('.selector__input'),
        selectItem = select.querySelectorAll('.selector__option');
    selectCurrentButton.addEventListener('click', function (e) {
      selectList.closest('.selector').classList.toggle('is-shown');
    });
    selectItem.forEach(function (item) {
      item.addEventListener('click', function () {
        var itemValue = item.getAttribute('data-value');
        var itemText = item.textContent;
        selectInput.value = itemValue;
        selectCurrent.textContent = itemText;
        selectListHide();
      });
    });

    var selectListHide = function selectListHide() {
      selectList.closest('.selector').classList.remove('is-shown');
    };

    document.addEventListener('click', function (e) {
      if (!select.contains(e.target)) selectListHide();
    });
  });
};

var filterSlider = function filterSlider() {
  var stepsSlider = document.querySelector('.filter-slider__line');
  var input0 = document.querySelector('.filter-slider__input--from');
  var input1 = document.querySelector('.filter-slider__input--to');
  var inputs = [input0, input1];

  if (stepsSlider) {
    noUiSlider.create(stepsSlider, {
      start: [5, 15],
      connect: true,
      tooltips: [true, wNumb({
        decimals: 0
      })],
      range: {
        'min': 0,
        'max': 40
      },
      format: wNumb({
        decimals: 0,
        thousand: ''
      })
    });
    stepsSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle];
    });
    inputs.forEach(function (input, handle) {
      input.addEventListener('change', function () {
        stepsSlider.noUiSlider.setHandle(handle, this.value);
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  inputsFilter();
  inputMasking();
  imgToBackground();
  sliders();
  burgerMenu('menu-bot-header');
  popups();
  formValidation();
  smoothScroll(500);
  preloader();
  filterSlider();
  selectors();
  dropdownMenu();
  yandexMaps();
  svg4everybody();
});