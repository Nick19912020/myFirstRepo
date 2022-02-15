"use strict";
const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector('.rollback span.range-value');
const totalInput = document.getElementsByClassName('total-input');
const cms = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
let total = totalInput[0];
let quantity = totalInput[1];
let allServicePrices = totalInput[2];
let fullTotalCount = totalInput[3];
let profitNoRollbackInput = totalInput[4];
let screens = document.querySelectorAll('.screen');


const appData = {
    rollback: 0,
    title: '',
    screens: [],
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    profitNoRollback: 0,
    screenPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    screensQuantity: 0,

    init: function () {
        this.addTitle();
        plusButton.addEventListener('click', this.addScreenBlock.bind(this));
        startBtn.addEventListener('click', this.start.bind(this));
        range.addEventListener('input', this.getRollback.bind(this));
        range.addEventListener('change', this.getRollback.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
        cms.addEventListener('click', this.showCms)
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    showResult: function () {
        total.value = this.screenPrice;
        allServicePrices.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        profitNoRollbackInput.value = this.profitNoRollback;
        quantity.value = this.screensQuantity;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        this.screens = [];
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                count: +input.value,
                price: +select.value * +input.value,
            })
        })
        for (let i = 0; i < this.screens.length; i++) {
            if (this.screens[i].name === 'Тип экранов' || this.screens[i].count === 0) {
                this.screens = [];
            }
        }
    },

    addServices: function () {
        percentItems.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        })

        numberItems.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },

    getRollback: function (event) {
        rangeValue.textContent = event.target.value + '%';
        this.rollback = event.target.value;
    },

    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, accum) => {
            return sum + accum.price;
        }, 0)

        if (this.screens.length !== 0) {
            for (let key in this.servicesNumber) {
                this.servicePricesNumber += this.servicesNumber[key];
            }
        } else {
            this.servicePricesNumber = 0;
        }

        if (this.screens.length !== 0) {
            for (let key in this.servicesPercent) {
                this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
            }
        } else {
            this.servicePricesPercent = 0;
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.profitNoRollback = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));

        this.screensQuantity = 0;
        for (let i = 0; i < this.screens.length; i++) {
            this.screensQuantity += this.screens[i].count;
        }
    },

    showCms: function () {
        if (cms.checked) {
            cmsVariants.style.display = 'flex';
        } else {
            cmsVariants.style.display = 'none';
        };
    },

    block: function () {
        if (this.screens.length !== 0) {
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block'
            plusButton.setAttribute("disabled", "disabled");

            screens = document.querySelectorAll('.screen');
            screens.forEach((screen) => {
                const select = screen.querySelector('select');
                const input = screen.querySelector('input');
                select.setAttribute("disabled", "disabled");
                input.setAttribute("disabled", "disabled");
            })
        }
    },

    unblockStartBtn: function () {
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';
        plusButton.removeAttribute("disabled", "disabled");
    },

    clearResult: function () {
        total.value = '0';
        allServicePrices.value = '0';
        fullTotalCount.value = '0';
        profitNoRollbackInput.value = '0';
        quantity.value = '0';
        rangeValue.textContent = '0%';
        range.value = 0;
        this.rollback = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.profitNoRollback = 0;
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.screensQuantity = 0;
    },

    clearServicesCheckbox: function () {
        percentItems.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');

            if (check.checked) {
                check.checked = false;
            }
        })

        numberItems.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');

            if (check.checked) {
                check.checked = false;
            }
        })
    },

    deleteScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.removeAttribute("disabled", "disabled");
            input.removeAttribute("disabled", "disabled");
            select.selectedIndex = 0;
            input.value = '';

            for (let i = 1; i < screens.length; i++) {
                screens[i].remove();
            }
        })

        screens = document.querySelectorAll('.screen');
        this.screens = [];
    },

    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.block();
    },

    reset: function () {
        this.unblockStartBtn();
        this.clearResult();
        this.clearServicesCheckbox();
        this.deleteScreens();
    },
}

appData.init();