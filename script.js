
let title,
    screens,
    screenPrice,
    adaptive,
    service1,
    servicePrice1,
    service2,
    servicePrice2,
    allServicePrices,
    fullPrice,
    rollback;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Проект');
    screens = prompt('Какие типы экранов нужно разработать? \(Простые, Сложные, Интерактивные\)', 'Простые');
    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?', 10);
    } while (!isNumber(screenPrice));
    adaptive = confirm('Нужен ли адаптив на сайте?');
}();

const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            servicePrice1 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительный');
        } else if (i === 1) {
            servicePrice2 = prompt('Какой дополнительный тип услуги нужен?', 'Дополнительный');
        }
        do {
            sum += +prompt('Сколько это будет стоить?', 10);
        } while (!isNumber(sum));
    }
    return sum;
};

allServicePrices = getAllServicePrices();

function getFullPrice() {
    return screenPrice + allServicePrices;
}

fullPrice = getFullPrice();

rollback = 10;
let percent = fullPrice * (rollback / 100);

function getServicePercentPrices(price4, price5) {
    return Math.ceil(price4 - price5);
}

let servicePercentPrice = getServicePercentPrices(fullPrice, percent);

function getTitle(a) {
    a = a.trim();
    return a[0].toUpperCase() + a.slice(1).toLowerCase();
}

const getRollbackMessage = function () {
    if (fullPrice >= 300) {
        return 'Даем скидку в 10%';
    } else if (fullPrice >= 150 && fullPrice < 300) {
        return 'Даем скидку в 5%';
    } else if (fullPrice < 150 && fullPrice >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
    return { var: variable, type: typeof variable };
};

console.log('Значение и тип переменной title: ', showTypeOf(title));
console.log('Значение и тип переменной rollback: ', showTypeOf(rollback));
console.log('Значение и тип переменной adaptive: ', showTypeOf(adaptive));
console.log(`Вывод строки с типами экранов для разработки: ${Array.from([screens])}`);
console.log(`Cообщение о скидке пользователю: ${getRollbackMessage()}`);
console.log(`Cтоимость за вычетом процента отката посреднику: ${servicePercentPrice}`);

