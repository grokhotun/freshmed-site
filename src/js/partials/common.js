const inputsFilter = () => {
    document.querySelectorAll('.js-only-digits').forEach(item => {
        item.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });
};

const formValidation = () => {
    const forms = document.querySelectorAll('.form')
    const passwords = document.querySelectorAll('#password, #confirmPassword');
    forms.forEach(formItem => {
        const pristine = new Pristine(formItem);
        formItem.addEventListener('submit', function (e) {
            e.preventDefault();
            const valid = pristine.validate();
            if (valid) {
                formItem.submit();
            } else {
                setTimeout(() => {
                    pristine.reset()
                }, 5000)
            }
        });
    });
};

const inputMasking = () => {
    document.querySelectorAll('.js-mask-phone').forEach(item => {
        item.addEventListener('input', e => {
            VMasker(e.target).maskPattern("(999) 999-99-99");
        });
    });
};

const popups = () => {

    const popups = document.querySelectorAll('.popup');
    const popupOpenLinks = document.querySelectorAll('.js-popup-open');
    const popupCloseLinks = document.querySelectorAll('.js-popup-close');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const body = document.querySelector('body');

    let lockPaddingOffset = null;
    let burger = null;
    let isTransitioning = false;
    let shouldUnlock = false;

    function _bodyLock() {
        lockPaddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            lockPadding.forEach(element => {
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
                lockPadding.forEach(element => {
                    element.style.paddingRight = '0px';
                });
            }
            shouldUnlock = false;
        }
    }

    function _popupOpen(openingPopup) {
        if (!isTransitioning) {
            isTransitioning = true;
            const popupActive = document.querySelector('.popup.is-opened');
            if (popupActive) {
                _popupClose(popupActive, false);
            }
            openingPopup.scrollTo(0, 0);
            openingPopup.classList.add('is-opened');
            _bodyLock();
        }
    }

    function _popupClose(closingPopup, unlock = true) {
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
            popupOpenLinks.forEach(popupLink => {
                popupLink.addEventListener('click', e => {
                    e.preventDefault();
                    const openingPopup = document.querySelector(popupLink.getAttribute('href'));
                    if (openingPopup) {
                        _popupOpen(openingPopup);
                    }
                });
            });
        }

        if (popupCloseLinks.length > 0) {
            popupCloseLinks.forEach(popupLink => {
                popupLink.addEventListener('click', e => {
                    e.preventDefault();
                    _popupClose(popupLink.closest('.popup'));
                });
            });
        }

        if (popups.length > 0) {

            popups.forEach(element => {
                element.addEventListener('transitionend', e => {
                    if (e.propertyName === 'transform') {
                        _bodyUnlock();
                    }
                });

                element.addEventListener('click', e => {
                    if (!e.target.closest('.popup__body')) {
                        _popupClose(e.target.closest('.popup.is-opened'));
                    }
                });
            });

            document.addEventListener('keydown', e => {
                if (e.which === 27) {
                    const openedPopup = document.querySelector('.popup.is-opened');
                    if (openedPopup) {
                        _popupClose(openedPopup);
                    }
                }
            });
        }
    }

    init();

};

const imgToBackground = () => {
    document.querySelectorAll(".ibg").forEach(el => {
        if (el.querySelector('img')) {
            el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
            el.querySelector('img').style.display = 'none';
        }
    });
};

const burgerMenu = (className) => {
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector(`.${className}`);
    if (burgerMenu) {
        burger.addEventListener('click', (e) => {
            burger.classList.toggle('is-active');
            burgerMenu.classList.toggle('is-shown');
        });
        document.querySelector('.js-burger-close').addEventListener('click', e => {
            burger.classList.remove('is-active');
            burgerMenu.classList.remove('is-shown');
        });
    }
};

const sliders = () => {

    const sliderBanner = new Swiper('.banner-slider__container', {
        navigation: {
            prevEl: '.banner-slider__arrow--prev',
            nextEl: '.banner-slider__arrow--next'
        },
        pagination: {
            el: '.banner-slider__pagination',
            type: 'bullets',
        },
        slidesPerView: 1
    });

    const sliderActions = new Swiper('.actions-slider__container', {
        loop: true,
        pagination: {
            el: '.actions-slider__pagination',
            type: 'bullets',
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

    const sliderSimilars = new Swiper('.slider-similars__container', {
        loop: true,
        navigation: {
            nextEl: '.slider-similars__arrow--next',
            prevEl: '.slider-similars__arrow--prev'
        },
        spaceBetween: 45,
        slidesPerView: 1,
        breakpoints: {
            767: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1343: {
                slidesPerView: 4,
            },
        }
    });

    const sliderTestimonials = new Swiper('.slider-testimonials__container', {
        loop: true,
        pagination: {
            el: '.slider-testimonials__pagination',
            type: 'bullets',
        },
        spaceBetween: 60,
        slidesPerView: 1,
        breakpoints: {
            1470: {
                slidesPerView: 4,
            },
            800: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        }
    });
};

const smoothScroll = (duration) => {
    var linksNav = document.querySelectorAll('.js-smoothscroll-btn')
    linksNav.forEach( item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            var target = document.querySelector(e.target.getAttribute('href'));
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            var startPosition = window.pageYOffset;
            var distance = targetPosition - startPosition;
            var startTime = null;

            function animation(currentTime){
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
                return - c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }, false);
    });
    
};

const yandexMaps = () => {
    function init() {
        const footerMap = new ymaps.Map('yamap-footer', {
            center: [47.822373, 35.170355],
            zoom: 16,
        });

        const contactsMap = new ymaps.Map('yamap-contacts', {
            center: [47.822373, 35.170355],
            zoom: 16,
        });
    }
    ymaps.ready(init);
};

const preloader = () => {
    const preloaderBody = document.querySelector('.preloader__body');
    const preloader = document.querySelector('.preloader');
    const body = document.querySelector('body'); 
    if (preloader) {
        body.classList.add('lock');
        new Promise((resolve) => {
            setTimeout(resolve, 800)
        })
        .then(() => {
            preloaderBody.style.display = 'none';
            preloader.classList.add('is-loaded');
            body.classList.remove('lock');
        });
    }
};