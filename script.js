let appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    servicePrice1: 0,
    servicePrice2: 0,
    allServicePrices: 0,
    servicePercentPrices: 0,
    fullPrice: 0,
    rollback: 10,
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Проект');
        appData.screens = prompt('Какие типы экранов нужно разработать? \(Простые, Сложные, Интерактивные\)', 'Простые');
        do {
            appData.screenPrice = +prompt('Сколько будет стоить данная работа?', 10).trim();
        } while (!appData.isNumber(appData.screenPrice));
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            let price = 0;
            if (i === 0) {
                appData.servicePrice1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительный');
            } else if (i === 1) {
                appData.servicePrice2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительный');
            }
            do {
                price = +prompt('Сколько это будет стоить?', 10).trim(); // все ок 10
            } while (!appData.isNumber(price));
            sum += price;
        }
        return sum;
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getTitle: function (a) {
        a = a.trim();
        return a[0].toUpperCase() + a.slice(1).toLowerCase();
    },
    getRollbackMessage: function () {
        if (appData.fullPrice >= 300) {
            return 'Даем скидку в 10%';
        } else if (appData.fullPrice >= 150 && appData.fullPrice < 300) {
            return 'Даем скидку в 5%';
        } else if (appData.fullPrice < 150 && appData.fullPrice >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    logger: function () {
        for (let key in appData) {
            console.log(key);
        }
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrices = appData.getServicePercentPrices();
        appData.getTitle(appData.title);
        appData.logger();

    }

};
appData.start();
console.log(appData.getAllServicePrices());




