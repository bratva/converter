'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text
    } = React;

var HeaderComponent = require('./Header');

var i18n = require('../localize/i18n');

var HelpView = React.createClass({
    render() {
        let {onPressBack, name, language} = this.props;

        return (
            <View style={styles.layout}>
                <HeaderComponent onPressBack={onPressBack} name={name} language={language}/>

                <View style={styles.container}>
                    <View style={styles.textBox}>
                        <Text style={styles.title}>
                            {i18n('help.title.desc', language)}
                        </Text>
                        <Text style={styles.text}>
                            {i18n('help.text.main', language)}
                        </Text>
                        <Text style={styles.text}>
                            {i18n('help.text.ex', language)}
                        </Text>
                        <Text style={styles.title}>
                            {i18n('help.title.manual', language)}
                        </Text>
                        <Text style={styles.text}>
                            {i18n('help.text.man', language)}
                        </Text>
                        <Text style={styles.go}>
                            {i18n('help.text.go', language)}
                        </Text>
                    </View>
                    <View style={styles.copyright}>
                        <Text style={styles.copyText}>
                            Developer's brat-va
                        </Text>
                    </View>
                </View>
            </View>
        );
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
        padding: 8,
        paddingLeft: 6,
        paddingRight: 6
    },

    textBox: {

    },

    title: {
        fontSize: 15,
        fontWeight: '200',
        marginTop: 12,
        color: '#D32F2F'
    },

    offset: {
        marginTop: 12
    },

    text: {
        fontSize: 12,
        lineHeight: 20,
        color: '#607D8B',
        textAlign: 'left'
    },

    go: {
        fontSize: 12,
        padding: 12,
        color: '#Fff',
        textAlign: 'center',
        backgroundColor: '#F44336',
        marginTop: 12
    },

    copyright: {

    },

    copyText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#bbb'
    }
});

module.exports = HelpView;