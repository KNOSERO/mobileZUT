import React, { useState, useEffect} from 'react'
import { WebView } from 'react-native-webview';
import { View, Text, SafeAreaView, StyleSheet} from 'react-native';

import Map from "../../component/map";

import { connect } from 'react-redux';

const MapScreen = (props) => {

    const [html, setHtml] = useState(``);

    useEffect(() => {
        if(props.location != null)
            setHtml(new Map(`500px`, `300px`)
            .setView(`[${props.location.where.lat}, ${props.location.where.lng}], 16`)
            .cyrcle(`[${props.myPosition.lat}, ${props.myPosition.lng}]`)
            .marker(`[${props.location.where.lat}, ${props.location.where.lng}]`, props.location.address).return());   
        else
            setHtml(new Map(`500px`, `300px`)
            .cyrcle(`[${props.myPosition.lat}, ${props.myPosition.lng}]`)
            .return());
    });

    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 1}}>
                {
                <WebView
                    source={{ html: html }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                >
                </WebView> }
            </SafeAreaView>
            <View style={{ flex: 1 }}>
            {
                props.location != null
                    ?
                    <View style={styles.element}>
                        <Text style={styles.text}> Nazwa: {props.location.fullName} </Text>
                        <Text style={styles.text}> Adres: {props.location.address} </Text>
                    </View>
                    :
                    <View style={styles.textInfo}>
                        <Text> Nieznaleziono budynku wydziału </Text>
                    </View>
            }
            </View>
        </View>
    );
}

const mapStateToProps = state => ({
    myPosition: state.location.myPosition,
    location: state.location.location,
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

export default connect(mapStateToProps, {})(MapScreen);