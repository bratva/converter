'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    TextInput,
    AlertIOS
    } = React;

var HeaderComponent = require('./Header');
var LoaderComponent = require('./Loader');

var i18n = require('../localize/i18n');

var CurrencyView = React.createClass({

    componentPropsChanged(props, nextProps) {
        let clone = nextProps.currency.slice(0);

        this.setState({currency: clone, mainCurrency: nextProps.mainCurrency});
    },

    componentDidMount() {
        this.componentPropsChanged({}, this.props);
    },

    render() {
        let {currency, mainCurrency} = this.state;
        let {loaded, onPressBack, name, language} = this.props;

        if (!loaded) {
            return (<LoaderComponent />);
        }

        var content;

        if (currency.length) {
            content = (
                <ScrollView
                    style={styles.verticalScrollView}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={true}
                    scrollEventThrottle={200}
                >
                    {currency && currency.map(this._renderValute)}
                </ScrollView>
            );
        } else {
            content = this._getEmptyMessage();
        }

        return (
            <View style={styles.layout}>
                <HeaderComponent onPressBack={onPressBack} name={name} language={language}/>

                <View style={styles.container}>
                    <TextInput
                        style={[styles.mainCurrency]}
                        onChangeText={this._changeMainCurrency}
                        name='mainCurency'
                        placeholder={i18n('inputHintMainCurrency', this.props.language)}
                        value={mainCurrency}
                    />

                    {this._renderMainCurrencyHint(mainCurrency)}
                    {content}
                </View>
                <View style={styles.buttonBox}>
                    <TouchableHighlight
                        style={styles.addBtn}
                        onPress={this._onPressAdd}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.saveBtn}
                        onPress={this._onPressSave}>
                        <Text style={styles.addButtonText}>{i18n('save', this.props.language)}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },

    _renderMainCurrencyHint: function (mainCurrency) {
        if (!mainCurrency) {
            return null;
        }

        return (
            <Text style={[styles.mainCurrencyHint]}>{i18n('mainCurrencyHint', this.props.language).replace('%val%', mainCurrency)}</Text>
        );

    },

    _getEmptyMessage() {
        return (
            <View style={styles.emptyMessage}>
                <Text style={styles.emptyMessageText}>{i18n('valuteEmpty', this.props.language)}</Text>
            </View>
        );
    },

    _changeVal(id, type, text) {
        let currency = this.state.currency;
        let findIndex;

        currency.forEach((valute, index) => {
            if (valute.id === id) {
                findIndex = index;
            }
        });

        let newCurrency = currency.concat();

        if (type === 'price') {
            text = text.replace(',', ',');
        }

        newCurrency[findIndex][type].value = text;

        this.setState({currency: newCurrency});
    },

    _changeMainCurrency(text) {
        this.setState({mainCurrency: text});
    },

    _renderValute(valute, index) {
        let price = valute.price;
        let type = valute.type;

        return (
            <View style={styles.row} key={index}>
                <TextInput
                    style={[styles.input, styles.inputPrice]}
                    onChangeText={this._changeVal.bind(this, valute.id, 'price')}
                    name={valute.id}
                    placeholder={i18n('inputHintPrice', this.props.language)}
                    keyboardType="numeric"
                    value={price.value}
                />
                <TextInput
                    style={[styles.input, styles.inputType]}
                    onChangeText={this._changeVal.bind(this, valute.id, 'type')}
                    name={valute.id}
                    placeholder={i18n('InputHintType', this.props.language)}
                    value={type.value}
                />
                <TouchableHighlight
                    style={styles.remove}
                    onPress={this._onPressRemove.bind(this, valute.id)}>
                    <Text style={styles.removeButtonText}>-</Text>
                </TouchableHighlight>
            </View>
        );
    },

    _onPressAdd() {
        if (this.state.currency.length >= 6) {
            AlertIOS.alert(
                i18n('errorFull', this.props.language).replace('%val%', 6),
                null,
                [{text: 'OK', type: 'default'}]
            );

            return;
        }

        var currency = this.state.currency.concat([{
            id: new Date().getTime(),
            price: {
                value: ''
            },
            type: {
                value: ''
            }
        }]);

        this.setState({currency: currency});
    },

    _onPressSave() {
        let currency = this.state.currency.filter((item) => (
           item.price.value && item.type.value
        ));

        this.props.onUpdateCurrency({
            data: currency,
            mainCurrency: this.state.mainCurrency
        });
    },

    _onPressRemove(id) {
        let currency = this.state.currency;
        let findIndex;

        currency.forEach((valute, index) => {
            if (valute.id === id) {
                findIndex = index;
            }
        });

        if (typeof findIndex !== 'undefined') {
            currency.splice(findIndex, 1);

            this.setState({currency: currency});
        }
    },

    getInitialState() {
        return {
            currency: [],
            mainCurrency: ''
        };
    }
});

var styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        padding: 20,
        paddingLeft: 6,
        paddingRight: 6
    },

    verticalScrollView: {
        flex: 1,
        minHeight: 250,
        alignSelf: 'stretch'
    },


    buttonBox: {
        alignItems: 'stretch'
    },

    addBtn: {
        padding: 12,
        backgroundColor: '#607D8B'
    },

    saveBtn: {
        padding: 12,
        backgroundColor: '#D32F2F'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignSelf: 'stretch'
    },

    input: {
        height: 30,
        borderWidth: 0.5,
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10
    },

    mainCurrency: {
        height: 40,
        borderWidth: 0.5,
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'stretch',
        marginBottom: 12
    },

    mainCurrencyHint: {
        fontSize: 14,
        textAlign: 'left',
        color: '#607D8B',
        marginBottom: 12
    },

    inputPrice: {
        width: 120
    },

    inputType: {
        width: 80
    },

    remove: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 30,
        backgroundColor: '#FF5252',
        alignItems: 'center',
        alignSelf: 'center'
    },

    addButtonText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#FFF'
    },

    removeButtonText: {
        fontSize: 22,
        textAlign: 'center',
        color: '#FFF'
    },

    emptyMessage: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    emptyMessageText: {
        fontSize: 15,
        color: '#607D8B',
        textAlign: 'center'
    }
});

module.exports = CurrencyView;