'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
    } = React;

var HeaderComponent = require('./Header');
var LoaderComponent = require('./Loader');

var i18n = require('../localize/i18n');

var ConverterView = React.createClass({

    render() {
        let {value} = this.state;
        let {loaded, onPressSetting, onPressCurrency, name, language, mainCurrency} = this.props;

        if (!loaded) {
            return (<LoaderComponent />);
        }

        return (
            <View style={styles.layout}>
                <HeaderComponent name={name} onPressSetting={onPressSetting} language={language}/>

                <View style={styles.container}>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputLabel}>{i18n('currentValue', this.props.language)} {mainCurrency}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this._changeVal}
                            placeholder={mainCurrency}
                            keyboardType="numeric"
                            value={String(value || '')}
                        />
                    </View>

                    {this._renderResults()}
                </View>
                <View style={styles.editCurrencyBtn}>
                    <TouchableHighlight
                        style={styles.currencyBtn}
                        onPress={onPressCurrency}>
                        <Text style={styles.currencyBtnText}>{i18n('currency', this.props.language)}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },

    _renderResults() {
        let val = Number(this.state.value);

        if (isNaN(val)) {
            val = 0;
        }

        let items = this.props.currency.map((item, index) => {
            let resVal = Number(item.price.value * val).toFixed(2);

            return (
               <Text style={styles.result} key={index}>{resVal} {item.type.value}</Text>
            )
        });

        return (
            <View style={styles.results}>
                {items}
            </View>
        )
    },

    _changeVal(value) {
        value = Number(value);

        if (isNaN(value)) {
            value = 0;
        }

        this.setState({value});
    },

    getInitialState() {
        return {
            value: 0
        };
    }
});

var styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    container: {
        padding: 20,
        paddingLeft: 6,
        paddingRight: 6,

        flex: 1,
        alignSelf: 'stretch'
    },

    inputLabel: {
        fontSize: 12,
        color: '#607D8B'
    },
    input: {
        borderWidth: 0.5,
        fontSize: 25,
        height: 40,
        textAlign: 'center'
    },

    result: {
        fontSize: 15,
        marginTop: 6,
        padding: 10,
        backgroundColor: '#607D8B',
        color: '#fff',
        alignSelf: 'flex-start'

    },

    editCurrencyBtn: {
        alignSelf: 'stretch',
        alignItems: 'stretch'
    },

    currencyBtn: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#D32F2F'
    },

    currencyBtnText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff'
    }
});

module.exports = ConverterView;