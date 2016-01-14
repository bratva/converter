const LOCALS = {
    ru: {
        app: 'Конвертер',
        setting: 'Настройки',
        currency: 'Валюты',
        currentValue: 'Текущая валюта',
        back: 'Назад',
        loading: 'Загрузка...',
        save: 'Сохранить',
        lang: 'Язык',
        valuteEmpty: 'Необходимо добавить валюты для дальнейшен конвертации',
        inputHintPrice: 'Обменный курс',
        InputHintType: 'Имя валюты',
        inputHintMainCurrency: 'Основная валюта',
        errorFull: 'Нельзя добавлять более %val% валют'
    },
    en: {
        app: 'Converter',
        setting: 'Settings',
        currency: 'Currencies',
        currentValue: 'Current currency',
        back: 'Back',
        loading: 'Loading...',
        save: 'Save',
        lang: 'Language',
        valuteEmpty: 'Please, add a currency',
        inputHintPrice: 'Exchange rate',
        InputHintType: 'Name',
        inputHintMainCurrency: 'Main currency',
        errorFull: 'You can not add more than %val% currencies'
    }
};

module.exports = function (key, lang) {
    return LOCALS[lang][key];
};