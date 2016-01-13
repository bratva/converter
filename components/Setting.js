'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    PickerIOS,
    } = React;

var PickerItemIOS = PickerIOS.Item;

var HeaderComponent = require('./Header');
var LoaderComponent = require('./Loader');

const LANGUAGES = [{name: 'Русский', value: 'ru'}, {name: 'English', value: 'en'}];

var SettingView = React.createClass({

    componentPropsChanged(props, nextProps) {
        this.setState({language: nextProps.language});
    },

    componentDidMount() {
        this.componentPropsChanged({}, this.props);
    },

    render() {
        let {onPressBack, name} = this.props;

        let list = LANGUAGES.map((item) => (
            <PickerItemIOS
                key={item.value}
                value={item.value}
                label={item.name}
            />
        ));

        return (
            <View style={styles.layout}>
                <HeaderComponent onPressBack={onPressBack} name={name} language={this.state.language}/>

                <View style={styles.container}>

                    <View style={styles.langBox}>
                        <PickerIOS
                            selectedValue={this.state.language}
                            key="language"
                            onValueChange={this._changeVal}
                            itemStyle={styles.selector}
                        >
                            {list}
                        </PickerIOS>
                    </View>
                </View>
            </View>
        );
    },

    _changeVal(language) {
        this.setState({language});
        this.props.onUpdateLang(this.state.language);
    },

    getInitialState() {
        return {
            language: 'ru'
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

    buttonBox: {
        alignItems: 'stretch'
    },

    langBox: {
        flex: 1,
        minHeight: 250,
        alignSelf: 'stretch'
    },

    selector: {
        fontSize: 25,
        color: '#607D8B'
    },

    saveBtn: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#D32F2F'
    },

    addButtonText: {
        fontSize: 22,
        textAlign: 'center',
        color: '#FFF'
    }
});

module.exports = SettingView;