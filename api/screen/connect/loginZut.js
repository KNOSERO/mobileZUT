import React, { useEffect, useState } from 'react'
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';

import RestAPI from "../../component/restApi";

const LoginZutScreen = (props) => {

    const [loading, setLoading] = useState();

    const [flag, setFlag] = useState({
        login: 0,
        password: 0,
    });

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();

    useEffect(()=> {
        setLoading(true)
    })

    const makeConnect = async () => {

        const fetchZut = new RestAPI.RestZutClient();
        const fetchCalendar = new RestAPI.RestCalendarClient();

        await fetchZut.token({
            login: login,
            password: password,
        })
            .then(async result => {
                const user = await JSON.parse(result);
                if (user.logInStatus == "OK") {
                    for (let i = -30; i < 180; i++) {
                        await fetchZut.day({
                            login: login,
                            token: user.token,
                            day: i,
                        })
                            .then(async result => {
                                const day = JSON.parse(result);
                                if (day.Plan) {
                                    if (Array.isArray(day.Plan)) {
                                        day.Plan.forEach(async element => {
                                            await fetchCalendar.addHour(props.token, element);
                                        });
                                    }
                                    else {
                                        await fetchCalendar.addHour(props.token, day.Plan);
                                    }
                                }
                            });
                    }
                    return 1;
                }
                else {
                    Alert.alert(
                        "Złe dane konta",
                        "Hasło lub nr Albumu",
                        [
                            { text: "OK", onPress: () => {} }
                        ],
                        { cancelable: false }
                    );
                    return 1;
                }
            })
    }

    const push = async () => {
        if (loading) {
            console.log(1);
            setLoading(false);
            const validation = () => {
                return new Promise(resolve => {
                    const temp = {
                        login: 0,
                        password: 0,
                    };

                    if ('' === login)
                        temp.login = 1;
                    if ('' === password)
                        temp.password = 1;

                    setFlag(temp);
                    resolve(temp.login + temp.password);
                })
            };

            await validation().then(async v => {
                if (!v) {
                    await makeConnect().then(r => {
                        try {
                            if (r == 1)
                                setLoading(true);
                        } finally { }
                    })
                }
                else {
                    try {
                        setLoading(true);
                    } finally { }
                }
            })
        }
    };


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.keyboardBox}
        >
            <View style={styles.imageBox}>
                <Image 
                    source={require('../../asset/logo_zut.jpg')} 
                    style={styles.image}
                />
            </View> 
            <View
                style={styles.formBox}
            >
                
                <TextInput
                    style={styles.imput}
                    placeholder='e-mail'
                    onChangeText={(val) => setLogin(val)}
                    value={login}
                />
                {flag.login ? <Text>zly email</Text> : <Text />}

                <TextInput
                    style={styles.imput}
                    placeholder='hasło'
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    value={password}
                />
                {flag.password ? <Text>zle hasło</Text> : <Text />}

                <TouchableOpacity
                    onPress={push}
                >
                    <View 
                        style={styles.buttonAccept}
                    >
                        <Text style={styles.buttonText}>Połącz</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            {
                loading == false ?
                    <View style={styles.loading}>
                        <ActivityIndicator size={100} color="#727EBF" />
                    </View>
                    :
                    null
            }
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
});

const styles = StyleSheet.create({
    keyboardBox: {
        backgroundColor: 'white',
        minHeight: '100%',
    },
    formBox: {
        marginTop: -20,
        backgroundColor: 'white',
        padding: 25
    },
    imput: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10,
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#c0c0c0',
    },
    errText: {
        marginLeft: 30,
        color: 'red',
    },
    buttonAccept: {
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: '#66B290',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    textLink: {
        fontSize: 15,
        color: '#727EBF',
        textAlign: 'center',
    },
    imageBox: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    image: {
        alignSelf: 'center'
    },
    loading: {
        position: 'absolute',
        alignSelf: 'center',
        margin: 200
    }
});

export default connect(mapStateToProps, {})(LoginZutScreen);