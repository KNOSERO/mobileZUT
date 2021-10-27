import React from 'react'
import {ImageBackground, Image, View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const LogoProfile = (props) => {

    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../asset/tapeta.jpg')} style={styles.image}>
            <View style={styles.mainView}>
                <View style={styles.secondView}>
                    <Image style={styles.logo} source={require('../../asset/student.png')} />
                </View>
                <View style={styles.secondView}>
                    <Text style={styles.text}>{props.email}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = state => ({
    email: state.auth.user.email,
});

const styles = StyleSheet.create({
    image: {
        height: 100,
    },
    logo: {
        width: 40,
        height: 40,
    },
    mainView: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        maxWidth: 220,
    },
    secondView: {
        justifyContent: 'center',
        margin: 5,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        overflow: 'hidden',
    },
});

export default connect(mapStateToProps, {})(LogoProfile);