import React from "react";
import { Image, StyleSheet, View } from "react-native";

const LogoHeder = () => {
    return (
        <View style={styles.header}>
            <Image source={require('./logoHeder.png')} style={styles.logo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        aspectRatio: 4, 
        resizeMode: 'contain',
    }
});

export default LogoHeder;