'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Navigator,
    StyleSheet,
    } = React;

var store = require('react-native-simple-store');

var ConverterScreen = require('./components/Converter');
var SettingScreen = require('./components/Setting');

var app = React.createClass({
    render() {
        return (
            <Navigator
                initialRoute={{name: 'Конвертер'}}
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

            this.setState({loaded: true});
        });
    },

    getInitialState() {
        return {
            currency: [],
            loaded: false
        };
    },

    renderScene(route, nav) {
        switch (route.id) {
            case 'setting':
                return (
                    <SettingScreen
                        name='Настройки'
                        navigator={nav}
                        onPressBack={() => {
                            nav.pop();
                        }}
                        currency={this.state.currency}
                        onUpdateCurrency={this._updateCurrency}
                        loaded={this.state.loaded}
                    />
                );
            default:
                return (
                    <ConverterScreen
                        name={route.name}
                        onPressSetting={() => {
                            nav.push({
                                id: 'setting'
                            });
                        }}
                        navigator={nav}
                        currency={this.state.currency}
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
                currency: currency.data
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