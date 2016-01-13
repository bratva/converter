'use strict';

var React = require('react-native');
var {
    StyleSheet,
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

    }
});

module.exports = Loader;