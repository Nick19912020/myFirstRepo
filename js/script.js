"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");
const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    rollback: 10,
    fullPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicePercentPrice: 0,
    screenCount: 0,
    init: function () {
        this.addTitle();
        startBtn.addEventListener("click", this.start);
        buttonPlus.addEventListener("click", appData.addScreenBlock);
        inputRange.addEventListener("change", appData.rollbackFunc);
        resetBtn.addEventListener("click", appData.reset);
    },
    disableFunc: function () {
        const selects = document.querySelectorAll("select");
        selects.forEach((select) => {
            select.disabled = !select.disabled;
        });
        buttonPlus.disabled = !buttonPlus.disabled;
        inputRange.disabled = !inputRange.disabled;

        resetBtn.style.display = resetBtn.style.display === "none" ? "" : "none";
        startBtn.style.display = startBtn.style.display === "none" ? "" : "none";
    },
    reset: function () {
        const inputTexts = document.querySelectorAll("input[type=text]");
        const input = document.querySelector(".main-controls__input input");

        appData.screens = [];
        appData.screenPrice = 0;
        appData.rollback = 0;
        appData.fullPrice = 0;
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.servicePercentPrice = 0;
        appData.screenCount = 0;
        appData.showRezult();
        const checks = document.querySelectorAll("input[type=checkbox]");
        checks.forEach((check) => {
            check.checked = false;
            check.disabled = false;
        });
        appData.disableFunc();
        input.disabled = false;
        inputRange.value = "0";
        inputRangeValue.textContent = "0%";
        screens = [];
        screens = document.querySelectorAll(".screen");
        for (let i = 1; i < screens.length; i++) {
            screens[i].remove();
        }
        screens[0].querySelector("input").value = "";
        screens[0].querySelector("select").value = "";
    },
    rollbackFunc: function () {
        inputRangeValue.textContent = inputRange.value + "%";
        appData.rollback = +inputRange.value;
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        this.screens = [];
        screens = document.querySelectorAll(".screen");
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            let price = +select.value * +input.value;
            this.screens.push({
                id: index,
                name: selectName,
                price: price,
                count: +input.value,
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    showRezult: function () {
        total.value = this.screenPrice;
        totalCountOther.value =
            this.servicePricesNumber + this.servicePricesPercent;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screenCount;
    },
    start: function () {
        if (appData.isEmpty()) {
            appData.addScreens();
            appData.addServices();
            appData.addPrice();
            appData.showRezult();
            appData.disableBtn();
        }
    },

    disableBtn: function () {
        const inputTexts = document.querySelectorAll("input[type=text]");
        appData.disableFunc();
        inputTexts.forEach((input) => {
            input.disabled = true;
        });
        const checks = document.querySelectorAll("input[type=checkbox]");
        checks.forEach((check) => {
            check.disabled = true;
        });
    },
    isEmpty: function () {
        screens = document.querySelectorAll(".screen");
        for (let screen of screens) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            if (select.value === "" || input.value === "") {
                return false;
            }
        }
        return true;
    },
    addPrice: function () {
        this.screenPrice = this.screens.reduce((sum, item) => {
            return sum + item.price;
        }, 0);
        this.screenCount = this.screens.reduce((sum, item) => {
            return sum + item.count;
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += +this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent +=
                this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice =
            this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice =
            this.fullPrice - this.fullPrice * (this.rollback / 100);
    },
    logger: function () {
        console.log(appData.servicePercentPrice);
        console.log(appData.fullPrice);
        console.log(appData.screens);
    },
};
appData.init();