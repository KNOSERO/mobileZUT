import React from 'react'
import { View, Image, StyleSheet, Text} from "react-native";
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

const Diagram = (props) => {


    const uri = 'https://picture-mobilezut.herokuapp.com'

    const html = `<img style="display: block;margin-left: auto; margin-right: auto;width: 100%;" src="${uri}/${encodeURIComponent(props.picture.locName)}/${encodeURIComponent(props.picture.roomName)}">`

    return (
        <View style={{
            flex: 1,
            maxHeight: 350
        }}>
            {
                props.picture != null ?
                    <WebView
                        source={{ html: html }}
                    />
                    :
                    null
            }
            <View style={styles.element}>
                <Text style={styles.text, {color: '#66B290'}}> WEJSCIE/WYJSCIE </Text>
                <Text style={styles.text, {color: '#727EBF'}}> SALA ZAJĘĆ </Text>
                <Text style={styles.text, {color: '#ffa500'}}> STOŁÓWKA/SKLEPIK </Text>
                <Text style={styles.text, {color: '#0080ff'}}> TOALETA </Text>
            </View>
        </View>
    );
}

const mapStateToProps = state => ({
    picture: state.location.picture,
});

const styles = StyleSheet.create({
    element: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10, 
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: 'white',
        opacity: 1,
    },
    text: {
        fontSize: 15,
    },
    textInfo: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(mapStateToProps, {})(Diagram);