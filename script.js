let appData = {
    title: '',
    screens: [],
    typeScreen: '',
    subServices: '',
    screenPrice: 0,
    adaptive: true,
    servicePrice1: 0,
    servicePrice2: 0,
    allServicePrices: 0,
    servicePercentPrices: 0,
    fullPrice: 0,
    rollback: 10,
    services: {},
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?', 'Проект');
        } while (appData.isNumber(appData.title));
        for (let i = 0; i < 1; i++) {
            do {
                appData.typeScreen = prompt('Какие типы экранов нужно разработать? \(Простые, Сложные, Интерактивные\)');
            } while (appData.isNumber(appData.typeScreen));
            let price = 0;
            do {
                price = prompt('Сколько это будет стоить?', 10);
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: appData.typeScree, price: price });
        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
        for (let i = 0; i < 2; i++) {
            do {
                appData.subServices = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительный');
            } while (appData.isNumber(appData.subServices));
            let price = 0;
            do {
                price = prompt('Сколько это будет стоить?', 10);
            } while (!appData.isNumber(price));
            appData.services[name] = +price;
        }
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrices = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getTitle: function (a) {
        a = a.trim();
        appData.title = a[0].toUpperCase() + a.slice(1).toLowerCase();
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
        return !isNaN(parseFloat(num)) && isFinite(num) && num != " ";
    },
    //isString: function (num) {
    //    return !isNaN(parseFloat(num)) && isFinite(num) && num != " ";
    //},
    logger: function () {
        for (let key in appData) {
            console.log(key, appData[key]);
        }
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle(appData.title);
        appData.logger();
        console.log(appData.screens);
    }

};
appData.start();




