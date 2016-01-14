'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Navigator,
    StyleSheet,
    } = React;

var store = require('react-native-simple-store');

var ConverterScreen = require('./components/Converter');
var CurrencyScreen = require('./components/Currency');
var SettingScreen = require('./components/Setting');

var i18n = require('./localize/i18n');

var app = React.createClass({
    render() {
        return (
            <Navigator
                initialRoute={{name: i18n('app', this.state.language)}}
                renderScene={this.renderScene}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.HorizontalSwipeJump;
                }}
            />
        );
    },

    componentDidMount() {
        store.get('currency').then((currency) => {
            if (currency && currency.data) {
                this.setState({currency: currency.data})
            }

            if (currency && currency.mainCurrency) {
                this.setState({mainCurrency: currency.mainCurrency})
            }

            this.setState({loaded: true});
        });

        store.get('language').then((lang) => {
            if (!lang) {
                store.save('language', 'ru').then(() => {
                    this.setState({language: 'ru'});
                })
            } else {
                this.setState({language: lang || 'ru'});
            }
        });
    },

    getInitialState() {
        return {
            currency: [],
            mainCurrency: 'Рубль',
            language: 'ru',
            loaded: false
        };
    },

    renderScene(route, nav) {
        switch (route.id) {
            case 'currency':
                return (
                    <CurrencyScreen
                        name={i18n('currency', this.state.language)}
                        navigator={nav}
                        onPressBack={() => {
                            nav.pop();
                        }}
                        currency={this.state.currency}
                        mainCurrency={this.state.mainCurrency}
                        language={this.state.language}
                        onUpdateCurrency={this._updateCurrency}
                        loaded={this.state.loaded}
                    />
                );
            case 'setting':
                return (
                    <SettingScreen
                        name={i18n('setting', this.state.language)}
                        navigator={nav}
                        onPressBack={() => {
                            nav.pop();
                        }}
                        language={this.state.language}
                        onUpdateLang={this._updateLanguage}
                    />
                );
            default:
                return (
                    <ConverterScreen
                        name={i18n('app', this.state.language)}
                        onPressCurrency={() => {
                            nav.push({
                                id: 'currency'
                            });
                        }}
                        onPressSetting={() => {
                            nav.push({
                                id: 'setting'
                            });
                        }}
                        navigator={nav}
                        language={this.state.language}
                        currency={this.state.currency}
                        mainCurrency={this.state.mainCurrency}
                        loaded={this.state.loaded}
                    />
                );
        }
    },

    _updateCurrency(data) {
        this.setState({loaded: false});

        store.update('currency', data).then(() => {
             return store.get('currency');
        }).then((currency) => {
            this.setState({
                loaded: true,
                currency: currency.data,
                mainCurrency: currency.mainCurrency
            });
        })
    },

    _updateLanguage(lang) {
        this.setState({loaded: false});

        store.update('language', lang).then(() => {
             return store.get('language');
        }).then((lang) => {
            this.setState({
                loaded: true,
                language: lang
            });
        })
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF5252'
    },
    logo: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }
});

AppRegistry.registerComponent('converter', () => app);

module.exports = app;