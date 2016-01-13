const LOCALS = {
    ru: {
        app: 'Конвертер валют',
        setting: 'Настройки',
        back: 'Назад',
        loading: 'Загрузка...',
        save: 'Сохранить',
        valuteEmpty: 'Необходимо добавить валюты для дальнейшен конвертации',
        inputHintPrice: 'Обменный курс',
        InputHintType: 'Имя валюты',
        errorFull: 'Нельзя добавлять более %val% валют'
    },
    en: {
        app: 'Currency Converter',
        setting: 'Settings',
        back: 'Back',
        loading: 'Loading...',
        save: 'Save',
        valuteEmpty: 'Please, add a currency',
        inputHintPrice: 'Exchange rate',
        InputHintType: 'Name',
        errorFull: 'You cann\'t add more than %val% currencies'
    }
};

module.exports = function (key, lang) {
    return LOCALS[lang][key];
};