'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    } = React;

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
                style={styles.setting}
                underlayColor="#B5B5B5"
                onPress={this.props.onPressBack}>
                <Text style={styles.buttonText}>Вернуться</Text>
            </TouchableHighlight>
        )
    },

    _renderSettingButton() {
        if (!this.props.onPressSetting) {
            return null;
        }

        return (
            <TouchableHighlight
                style={styles.setting}
                underlayColor="#B5B5B5"
                onPress={this.props.onPressSetting}>
                <Text style={styles.buttonText}>Настройки</Text>
            </TouchableHighlight>
        )
    }
});

var styles = StyleSheet.create({
    header: {
        backgroundColor: '#F44336',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
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

    }

});

module.exports = Header;