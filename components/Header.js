'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    } = React;

var i18n = require('../localize/i18n');

var Header = React.createClass({
    render() {
        return (
            <View style={styles.header}>
                {this._renderBackButton()}
                <Text style={styles.title}>
                    {this.props.name}
                </Text>
                {this._renderSettingButton()}
            </View>
        );
    },

    _renderBackButton() {
        if (!this.props.onPressBack) {
            return null;
        }

        return (
            <TouchableHighlight
                style={styles.btn}
                underlayColor="#B5B5B5"
                onPress={this.props.onPressBack}>
                <Text style={styles.buttonText}>{i18n('back', this.props.language)}</Text>
            </TouchableHighlight>
        )
    },

    _renderSettingButton() {
        if (!this.props.onPressSetting) {
            return null;
        }

        return (
            <TouchableHighlight
                style={styles.btn}
                underlayColor="#B5B5B5"
                onPress={this.props.onPressSetting}>
                <Text style={styles.buttonText}>{i18n('setting', this.props.language)}</Text>
            </TouchableHighlight>
        )
    }
});

var styles = StyleSheet.create({
    header: {
        backgroundColor: '#F44336',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingTop: 20,
        paddingLeft: 6,
        paddingRight: 6,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontSize: 12
    },
    btn: {
        justifyContent: 'center',
        height: 50
    }

});

module.exports = Header;