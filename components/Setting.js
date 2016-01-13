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

var setting = React.createClass({

    componentPropsChanged(props, nextProps) {
        let clone = nextProps.currency.slice(0);

        this.setState({currency: clone});
    },

    componentDidMount() {
        this.componentPropsChanged({}, this.props);
    },

    render() {
        let {currency} = this.state;
        let {loaded, onPressBack, name} = this.props;

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
                <HeaderComponent onPressBack={onPressBack} name={name}/>

                <View style={styles.container}>
                    {content}

                    <View style={styles.buttonBox}>
                        <TouchableHighlight
                            style={styles.addBtn}
                            onPress={this._onPressAdd}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.saveBtn}
                            onPress={this._onPressSave}>
                            <Text style={styles.addButtonText}>Сохранить</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    },

    _getEmptyMessage() {
        return (
            <View style={styles.emptyMessage}>
                <Text style={styles.emptyMessageText}>Необходимо добавить валюты для дальнейшен конвертации</Text>
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

        newCurrency[findIndex][type].value = text;

        this.setState({currency: newCurrency});
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
                    placeholder="Обменный курс"
                    value={price.value}
                />
                <TextInput
                    style={[styles.input, styles.inputType]}
                    onChangeText={this._changeVal.bind(this, valute.id, 'type')}
                    name={valute.id}
                    placeholder="Имя валюты"
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
                'Нельзя добавлять более 6 валют',
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
        this.props.onUpdateCurrency({
            data: this.state.currency
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
            error: null
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
        marginTop: 12,
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
        fontSize: 22,
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

module.exports = setting;