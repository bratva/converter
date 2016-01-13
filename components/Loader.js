'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    ActivityIndicatorIOS,
    View,
    } = React;

var Loader = React.createClass({
    render() {
        return (
            <View style={styles.loader}>
                <ActivityIndicatorIOS
                    style={[{height: 80}]}
                    color="#F44336"
                    size="large"
                />
                <Text style={styles.title}>
                    Загрузка...
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    loader: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        color: '#D32F2F',
        fontSize: 16
    }
});

module.exports = Loader;