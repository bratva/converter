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
        errorFull: 'Нельзя добавлять более %val% валют',
        mainCurrencyHint: 'Один %val% равен:',
        help: 'Помощь',
        'help.title.desc': 'Описание',
        'help.text.main': 'Конвертер очень прост. Его цель помочь вам перевести одну валюту в другие.',
        'help.text.ex': 'Например, Вьетнамский донг (VND) в рубли или доллары.',
        'help.title.manual': 'ИНСТРУКЦИЯ',
        'help.text.man': 'Для этого вам необходимо добавить основную валюту и валюты в которые необходимо выполнить перевод. Это можно сделать в разделе «Валюты» на главном экране.',
        'help.text.go': 'Ананас во Вьетнаме стоит 15 000 VND, а сколько это рублей?'
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
        errorFull: 'You can not add more than %val% currencies',
        mainCurrencyHint: 'One %val% equals:',
        help: 'Help',
        'help.title.desc': 'DESCRIPTION',
        'help.text.main': 'Converter is very simple. His goal is to help you to convert one currency to another.',
        'help.text.ex': 'For example, the Vietnamese dong (VND) in dollars or euros.',
        'help.title.manual': 'INSTRUCTIONS',
        'help.text.man': 'Для этого вам необходимо добавить основную валюту и валюты в которые необходимо выполнить перевод. Это можно сделать в разделе «Валюты» на главном экране.',
        'help.text.go': 'Pineapple in Vietnam is 15,000 VND, and how many dollars it?'
    }
};

module.exports = function (key, lang) {
    return LOCALS[lang][key];
};