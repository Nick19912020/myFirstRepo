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
        appData.addTitle();
        startBtn.addEventListener("click", appData.start);
        buttonPlus.addEventListener("click", appData.addScreenBlock);
        inputRange.addEventListener("change", appData.rollbackFunc);
    },
    rollbackFunc: function () {
        inputRangeValue.textContent = inputRange.value + "%";
        appData.rollback = +inputRange.value;
    },

    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        appData.screens = [];
        screens = document.querySelectorAll(".screen");
        screens.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            let price = +select.value * +input.value;
            appData.screens.push({
                id: index,
                name: selectName,
                price: price,
                count: +input.value,
            });
        });
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    showRezult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value =
            appData.servicePricesNumber + appData.servicePricesPercent;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.screenCount;
    },
    start: function () {
        if (appData.isEmpty()) {
            appData.addScreens();
            appData.addServices();
            appData.addPrice();
            appData.showRezult();
        }
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
        appData.screenPrice = appData.screens.reduce(function (sum, item) {
            return sum + item.price;
        }, 0);
        appData.screenCount = appData.screens.reduce(function (sum, item) {
            return sum + item.count;
        }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += +appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent +=
                appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice =
            appData.screenPrice +
            appData.servicePricesNumber +
            appData.servicePricesPercent;
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },
    logger: function () {
        console.log(appData.servicePercentPrice);
        console.log(appData.fullPrice);
        console.log(appData.screens);
    },
};
appData.init();



