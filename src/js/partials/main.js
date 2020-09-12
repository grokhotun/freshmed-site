!!include('./partials/common.js');

const dropdownMenu = () => {
    const dropdownMenu = document.querySelector('.js-dropdown-menu');
    const dropdownBtn = document.querySelector('.js-dropdown-menu-btn')
    if (dropdownMenu) {
        dropdownBtn.addEventListener('click', e => {
            e.preventDefault();
            dropdownMenu.classList.toggle('is-opened');
            dropdownBtn.classList.toggle('is-active');
        });
    }

    document.querySelector('body').addEventListener('click', e => {
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('.menu-bot-header__item')) {
            dropdownMenu.classList.remove('is-opened');
            dropdownBtn.classList.remove('is-active');
        }
    });
};

const selectors = () => {
    document.querySelectorAll('.selector').forEach(select => { 

        const selectCurrent = select.querySelector('.selector__current > span'),
            selectCurrentButton = select.querySelector('.selector__current'),
            selectList = select.querySelector('.selector__options'),
            selectInput = select.querySelector('.selector__input'),
            selectItem = select.querySelectorAll('.selector__option');

        selectCurrentButton.addEventListener('click', (e) => {
            selectList.closest('.selector').classList.toggle('is-shown');
        });

        selectItem.forEach(item => {
            item.addEventListener('click', () => {
                let itemValue = item.getAttribute('data-value');
                let itemText = item.textContent;
                selectInput.value = itemValue;
                selectCurrent.textContent = itemText;
                selectListHide();
            });
        });

        const selectListHide = () => {
            selectList.closest('.selector').classList.remove('is-shown');
        };

        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) selectListHide();
        });

    });
};

const filterSlider = () => {
    var stepsSlider = document.querySelector('.filter-slider__line');
    var input0 = document.querySelector('.filter-slider__input--from');
    var input1 = document.querySelector('.filter-slider__input--to');
    var inputs = [input0, input1];

    if (stepsSlider) {
        noUiSlider.create(stepsSlider, {
            start: [5, 15],
            connect: true,
            tooltips: [true, wNumb({ decimals: 0 })],
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